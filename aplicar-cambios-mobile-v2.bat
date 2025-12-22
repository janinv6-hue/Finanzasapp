@echo off
cls
color 0A
echo.
echo ====================================================
echo       INSTALADOR - REGISTRO DE GASTOS V2.0
echo              Version Mobile Optimizada
echo ====================================================
echo.
echo Presiona cualquier tecla para comenzar...
pause >nul
cls

echo.
echo [PASO 1/7] Verificando ubicacion...
echo.
echo Ubicacion actual: %CD%
echo.

REM Verificar carpeta www
if not exist "www" (
    color 0C
    echo.
    echo ============================================
    echo ERROR: No se encuentra la carpeta "www"
    echo ============================================
    echo.
    echo Este script debe ejecutarse desde:
    echo C:\Users\josej\finanzas-app\
    echo.
    echo Tu ubicacion actual es:
    echo %CD%
    echo.
    echo SOLUCION:
    echo 1. Abre el explorador de archivos
    echo 2. Navega a: C:\Users\josej\finanzas-app\
    echo 3. Copia este archivo .bat ahi
    echo 4. Ejecutalo de nuevo
    echo.
    echo Presiona cualquier tecla para salir...
    pause >nul
    exit /b 1
)

echo [OK] Carpeta www encontrada
echo.
pause

echo.
echo [PASO 2/7] Verificando archivo index.html nuevo...
echo.

if not exist "index.html" (
    color 0C
    echo.
    echo ============================================
    echo ERROR: No se encuentra index.html
    echo ============================================
    echo.
    echo El archivo index.html debe estar en:
    echo %CD%\index.html
    echo.
    echo SOLUCION:
    echo 1. Descarga el archivo index.html
    echo 2. Copia index.html a esta carpeta:
    echo    %CD%
    echo 3. Ejecuta este script de nuevo
    echo.
    echo Presiona cualquier tecla para salir...
    pause >nul
    exit /b 1
)

echo [OK] Archivo index.html encontrado
echo Tamano: 
dir index.html | find "index.html"
echo.
pause

echo.
echo [PASO 3/7] Creando respaldo del archivo original...
echo.

if not exist "www\backups" (
    mkdir "www\backups"
    echo [OK] Carpeta de respaldos creada
)

set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%

copy "www\index.html" "www\backups\index_backup_%TIMESTAMP%.html" >nul
if errorlevel 1 (
    echo [ADVERTENCIA] No se pudo crear respaldo
) else (
    echo [OK] Respaldo creado: www\backups\index_backup_%TIMESTAMP%.html
)
echo.
pause

echo.
echo [PASO 4/7] Aplicando nuevo archivo index.html...
echo.

copy /Y "index.html" "www\index.html" >nul
if errorlevel 1 (
    color 0C
    echo [ERROR] No se pudo copiar el archivo
    pause
    exit /b 1
)

echo [OK] Archivo aplicado correctamente
echo.
pause

echo.
echo [PASO 5/7] Sincronizando con Capacitor...
echo.
echo Esto puede tardar 1-2 minutos...
echo.

call npx cap sync
if errorlevel 1 (
    color 0E
    echo.
    echo [ADVERTENCIA] Hubo problemas al sincronizar
    echo Pero continuaremos de todas formas...
    echo.
    pause
)

echo.
echo [OK] Sincronizacion completada
echo.
pause

echo.
echo [PASO 6/7] Limpiando y compilando APK...
echo.
echo Este es el paso mas largo (3-5 minutos)
echo Por favor NO cierres esta ventana
echo.
pause

cd android
if errorlevel 1 (
    color 0C
    echo [ERROR] No se pudo acceder a la carpeta android
    pause
    cd ..
    exit /b 1
)

echo.
echo Limpiando proyecto...
call gradlew clean
echo.

echo.
echo Compilando APK... (esto tarda 3-5 minutos)
echo.
call gradlew assembleDebug

echo.
echo [PASO 7/7] Verificando resultado...
echo.

if exist "app\build\outputs\apk\debug\app-debug.apk" (
    color 0A
    cls
    echo.
    echo ====================================================
    echo           COMPILACION EXITOSA!!
    echo ====================================================
    echo.
    echo Tu APK esta lista en:
    echo %CD%\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo Tamano del archivo:
    dir "app\build\outputs\apk\debug\app-debug.apk" | find "app-debug.apk"
    echo.
    echo ====================================================
    echo            COMO INSTALAR EN TU CELULAR
    echo ====================================================
    echo.
    echo OPCION 1 - Con ADB ^(Recomendado^):
    echo   1. Conecta tu telefono con USB
    echo   2. Habilita Depuracion USB
    echo   3. Ejecuta este comando:
    echo.
    echo   adb install -r app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo OPCION 2 - Manual:
    echo   1. Copia app-debug.apk a tu telefono
    echo   2. Abre el archivo desde el telefono
    echo   3. Permite instalar desde fuentes desconocidas
    echo   4. Instala
    echo.
    echo ====================================================
    echo             NOVEDADES EN LA APP
    echo ====================================================
    echo.
    echo * Bottom Navigation ^(menu inferior fijo^)
    echo * FAB ^(boton flotante +^)
    echo * Modales deslizantes
    echo * Toast: "Transaccion registrada"
    echo * SIN scroll innecesario
    echo.
) else (
    color 0C
    echo.
    echo ====================================================
    echo            ERROR EN LA COMPILACION
    echo ====================================================
    echo.
    echo La APK no se genero correctamente.
    echo.
    echo Revisa los mensajes de error arriba.
    echo.
    echo POSIBLES CAUSAS:
    echo - Java no instalado o mal configurado
    echo - Android SDK falta o incompleto
    echo - Problemas con Gradle
    echo - Error en el codigo
    echo.
    echo Guarda los mensajes de error y consultalo.
    echo.
)

cd ..

echo.
echo ====================================================
echo Presiona cualquier tecla para cerrar esta ventana
echo ====================================================
pause >nul
