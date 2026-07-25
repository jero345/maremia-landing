# Genera src/assets/logo-mark.png (la luna y las olas) desde el logo original.
#
# El PNG que produce es una MASCARA: blanco con el alfa recortado del logo.
# El color se lo pone `currentColor` desde CSS, por eso el mismo archivo vale
# en crema sobre azul noche y en azul noche sobre crema.
#
# Los trazos de las olas miden 4 px sobre 640 en el original: a 40 px de alto
# desaparecerian, asi que se engrosan con una dilatacion separable, solo en la
# banda de las olas (la luna es solida y no la necesita).
#
# Uso:  powershell -File tools\logo-mark.ps1
#
# Si cambia el logo, revisa primero el recorte ($x0/$y0/$cw/$ch), la fila donde
# empiezan las olas ($wavesFrom) y las luminancias del fondo y de la tinta.

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root "tools\logo-original.jpg"
$dest = Join-Path $root "src\assets\logo-mark.png"

$x0 = 206; $y0 = 80; $cw = 640; $ch = 544   # recorte de la marca en el original
$navy = 42.0; $cream = 234.0                 # luminancia del fondo y de la tinta
$wavesFrom = 300                             # fila donde empiezan las olas
$radius = 4                                  # cuanto se engrosan los trazos

$img = [System.Drawing.Bitmap]::FromFile($src)

# --- leer el recorte de una vez (GetPixel pixel a pixel es demasiado lento) ---
$rect = New-Object System.Drawing.Rectangle $x0, $y0, $cw, $ch
$data = $img.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$bytes = New-Object byte[] ($stride * $ch)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
$img.UnlockBits($data)

$n = $cw * $ch
$alpha = New-Object double[] $n
for ($y = 0; $y -lt $ch; $y++) {
  $row = $y * $stride
  $out = $y * $cw
  for ($x = 0; $x -lt $cw; $x++) {
    $i = $row + $x * 4
    $lum = 0.0722 * $bytes[$i] + 0.7152 * $bytes[$i + 1] + 0.2126 * $bytes[$i + 2]  # BGRA
    $v = ($lum - $navy) / ($cream - $navy)
    if ($v -lt 0) { $v = 0 }
    if ($v -gt 1) { $v = 1 }
    $alpha[$out + $x] = $v
  }
}

# --- dilatacion separable (horizontal y luego vertical), solo en las olas ---
$tmp = New-Object double[] $n
[Array]::Copy($alpha, $tmp, $n)
for ($y = $wavesFrom; $y -lt $ch; $y++) {
  $out = $y * $cw
  for ($x = 0; $x -lt $cw; $x++) {
    $m = 0.0
    $from = $x - $radius; if ($from -lt 0) { $from = 0 }
    $to = $x + $radius; if ($to -ge $cw) { $to = $cw - 1 }
    for ($k = $from; $k -le $to; $k++) {
      $v = $alpha[$out + $k]
      if ($v -gt $m) { $m = $v }
    }
    $tmp[$out + $x] = $m
  }
}
$final = New-Object double[] $n
[Array]::Copy($tmp, $final, $n)
for ($y = $wavesFrom; $y -lt $ch; $y++) {
  for ($x = 0; $x -lt $cw; $x++) {
    $m = 0.0
    $from = $y - $radius; if ($from -lt $wavesFrom) { $from = $wavesFrom }
    $to = $y + $radius; if ($to -ge $ch) { $to = $ch - 1 }
    for ($k = $from; $k -le $to; $k++) {
      $v = $tmp[$k * $cw + $x]
      if ($v -gt $m) { $m = $v }
    }
    $final[$y * $cw + $x] = $m
  }
}

# --- escribir el PNG: blanco con el alfa calculado ---
$mask = New-Object System.Drawing.Bitmap $cw, $ch, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$mrect = New-Object System.Drawing.Rectangle 0, 0, $cw, $ch
$mdata = $mask.LockBits($mrect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$mstride = $mdata.Stride
$mbytes = New-Object byte[] ($mstride * $ch)
for ($y = 0; $y -lt $ch; $y++) {
  $row = $y * $mstride
  $inRow = $y * $cw
  for ($x = 0; $x -lt $cw; $x++) {
    $i = $row + $x * 4
    $a = [int][Math]::Round($final[$inRow + $x] * 255)
    if ($a -gt 255) { $a = 255 }
    $mbytes[$i] = 255
    $mbytes[$i + 1] = 255
    $mbytes[$i + 2] = 255
    $mbytes[$i + 3] = [byte]$a
  }
}
[System.Runtime.InteropServices.Marshal]::Copy($mbytes, 0, $mdata.Scan0, $mbytes.Length)
$mask.UnlockBits($mdata)
$mask.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
$mask.Dispose()
$img.Dispose()

"logo-mark.png {0} x {1}  {2} KB" -f $cw, $ch, [Math]::Round((Get-Item $dest).Length / 1KB)
