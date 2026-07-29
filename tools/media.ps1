# Regenera src/assets/media.js a partir de los JPG de src/assets.
#
# Para cada foto guarda:
#   - `size`: las dimensiones reales, para reservar el espacio y que no haya
#     saltos de layout mientras carga.
#   - `lqip`: la misma foto a 20 px de ancho, en base64. Pinta al instante
#     debajo de la definitiva, sin una peticion extra.
#
# Uso:  powershell -File tools\media.ps1
# Correr despues de anadir o reemplazar cualquier foto en src/assets.

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$assets = Join-Path $root "src\assets"
$dest = Join-Path $assets "media.js"

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }

$header = @"
// Archivo generado. No editar a mano.
// ``lqip`` es la miniatura de 20 px de cada foto incrustada en base64: pinta al
// instante mientras descarga el JPEG real, sin una peticion extra.
// ``size`` son las dimensiones reales, para reservar el espacio y evitar saltos.
// Para regenerarlo tras anadir fotos: powershell -File tools\media.ps1

"@

$lqip = "export const lqip = {`n"
$size = "export const size = {`n"
$count = 0

foreach ($file in (Get-ChildItem $assets -Filter *.jpg | Sort-Object Name)) {
  $img = [System.Drawing.Image]::FromFile($file.FullName)
  $key = $file.BaseName
  $size += "  '$key': [$($img.Width), $($img.Height)],`n"

  $w = 20
  $h = [int][Math]::Round($img.Height * (20 / $img.Width))
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $w, $h)
  $g.Dispose()

  $stream = New-Object System.IO.MemoryStream
  $params = New-Object System.Drawing.Imaging.EncoderParameters 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter (
    [System.Drawing.Imaging.Encoder]::Quality, [int]38
  )
  $bmp.Save($stream, $codec, $params)
  $base64 = [Convert]::ToBase64String($stream.ToArray())
  $lqip += "  '$key':`n    'data:image/jpeg;base64,$base64',`n"

  $stream.Dispose(); $bmp.Dispose(); $img.Dispose()
  $count++
}

$lqip += "}`n`n"
$size += "}`n"

[System.IO.File]::WriteAllText($dest, "$header$lqip$size", (New-Object System.Text.UTF8Encoding($false)))
"media.js regenerado con {0} fotos ({1} KB)" -f $count, [Math]::Round((Get-Item $dest).Length / 1KB)
