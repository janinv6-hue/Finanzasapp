@echo off
cls
color 0B
echo.
echo ====================================================
echo        DIAGNOSTICO - REGISTRO DE GASTOS
echo           Verificacion de Requisitos
echo ====================================================
echo.
echo Este script verifica que todo este listo
echo para compilar la app.
echo.
pause

cls
echo.
echo ====================================================
echo        VERIFICANDO REQUISITOS...
echo ====================================================
echo.

set ERRORES=0

REM 1. Verificar ubicacion
echo [1/8] Verificando ubicacion del script...
echo       Ubicacion: %CD%
if not exist "www" (
    color 0C
    echo       [X] ERROR: Carpeta www no encontrada
    echo           Debes ejecutar este script desde: C:\Users\josej\finanzas-app\
    set /a ERRORES+=1
) else (
    echo       [OK] Carpeta www encontrada
)
echo.

REM 2. Verificar index.html
echo [2/8] Verificando archivo index.html nuevo...
if not exist "index.html" (
    color 0C
    echo       [X] ERROR: index.html no encontrado en esta carpeta
    echo           Descarga y copia index.html a: %CD%
    set /a ERRORES+=1
) else (
    echo       [OK] index.html encontrado
    for %%A in (index.html) do echo       Tamano: %%~zA bytes
)
echo.

REM 3. Verificar www\index.html original
echo [3/8] Verificando index.html original en www...
if not exist "www\index.html" (
    color 0E
    echo       [!] ADVERTENCIA: No hay index.html en www
    set /a ERRORES+=1
) else (
    echo       [OK] index.html original existe
)
echo.

REM 4. Verificar node y npm
echo [4/8] Verificando Node.js y npm...
where node >nul 2>nul
if errorlevel 1 (
    color 0C
    echo       [X] ERROR: Node.js no instalado
    echo           Descarga de: https://nodejs.org
    set /a ERRORES+=1
) else (
    echo       [OK] Node.js instalado
    node --version
)

where npm >nul 2>nul
if errorlevel 1 (
    color 0C
    echo       [X] ERROR: npm no instalado
    set /a ERRORES+=1
) else (
    echo       [OK] npm instalado
    npm --version
)
echo.

REM 5. Verificar capacitor
echo [5/8] Verificando Capacitor...
where npx >nul 2>nul
if errorlevel 1 (
    color 0C
    echo       [X] ERROR: npx no disponible
    set /a ERRORES+=1
) else (
    echo       [OK] npx disponible
)
echo.

REM 6. Verificar carpeta android
echo [6/8] Verificando carpeta Android...
if not exist "android" (
    color 0C
    echo       [X] ERROR: Carpeta android no encontrada
    set /a ERRORES+=1
) else (
    echo       [OK] Carpeta android encontrada
    if exist "android\gradlew.bat" (
        echo       [OK] gradlew.bat encontrado
    ) else (
        color 0C
        echo       [X] ERROR: gradlew.bat no encontrado
        set /a ERRORES+=1
    )
)
echo.

REM 7. Verificar Java
echo [7/8] Verificando Java JDK...
where java >nul 2>nul
if errorlevel 1 (
    color 0E
    echo       [!] ADVERTENCIA: Java no encontrado en PATH
    echo           Gradle podria fallar al compilar
    set /a ERRORES+=1
) else (
    echo       [OK] Java instalado
    java -version 2>&1 | findstr "version"
)
echo.

REM 8. Verificar ADB (opcional)
echo [8/8] Verificando ADB ^(opcional^)...
where adb >nul 2>nul
if errorlevel 1 (
    color 0E
    echo       [!] INFO: ADB no encontrado
    echo           Necesario para instalar directamente en el celular
) else (
    echo       [OK] ADB instalado
    adb version | findstr "Android"
)
echo.
echo.

REM Resumen
echo ====================================================
echo              RESUMEN DEL DIAGNOSTICO
echo ====================================================
echo.

if %ERRORES%==0 (
    color 0A
    echo   ESTADO: TODO LISTO PARA COMPILAR!!
    echo.
    echo   Puedes ejecutar: aplicar-cambios-mobile-v2.bat
    echo.
) else (
    color 0C
    echo   ESTADO: SE ENCONTRARON %ERRORES% PROBLEMAS
    echo.
    echo   ANTES DE COMPILAR, DEBES:
    echo.
    
    if not exist "www" (
        echo   1. Ejecutar este script desde: C:\Users\josej\finanzas-app\
    )
    
    if not exist "index.html" (
        echo   2. Descargar index.html y copiarlo a esta carpeta
    )
    
    where node >nul 2>nul
    if errorlevel 1 (
        echo   3. Instalar Node.js desde: https://nodejs.org
    )
    
    where java >nul 2>nul
    if errorlevel 1 (
        echo   4. Instalar Java JDK 11 o superior
    )
    
    echo.
)

echo ====================================================
echo.
echo Ubicacion actual: %CD%
echo.
echo ====================================================
echo     SIGUIENTE PASO
echo ====================================================
echo.

if %ERRORES%==0 (
    echo 1. Ejecuta: aplicar-cambios-mobile-v2.bat
    echo 2. Espera que compile (3-5 minutos)
    echo 3. Instala la APK en tu celular
) else (
    echo 1. Corrige los problemas listados arriba
    echo 2. Ejecuta este diagnostico de nuevo
    echo 3. Cuando todo este OK, ejecuta: aplicar-cambios-mobile-v2.bat
)

echo.
echo ====================================================
echo.
echo Presiona cualquier tecla para cerrar...
pause >nul
