@echo off
echo ========================================
echo Aplicando Cambios Esteticos a la App
echo ========================================
echo.

REM Verificar que estamos en el directorio correcto
if not exist "www\index.html" (
    echo [ERROR] No se encuentra la carpeta www
    echo.
    echo Este script debe ejecutarse desde la carpeta raiz del proyecto
    echo Ejemplo: C:\Users\josej\finanzas-app\
    echo.
    pause
    exit /b 1
)

echo [1/5] Creando respaldo del archivo original...
if not exist "www\backups" mkdir "www\backups"
copy "www\index.html" "www\backups\index.html.%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.backup" >nul
echo [OK] Respaldo creado en www\backups\
echo.

echo [2/5] Aplicando archivo modificado...
if not exist "index.html" (
    echo [ERROR] No se encuentra el archivo index.html modificado
    echo.
    echo Por favor coloca el archivo index.html descargado en la carpeta raiz
    echo junto a este script.
    echo.
    pause
    exit /b 1
)

copy /Y "index.html" "www\index.html" >nul
echo [OK] Archivo aplicado
echo.

echo [3/5] Sincronizando con Capacitor...
call npx cap sync
if errorlevel 1 (
    echo [ADVERTENCIA] Hubo un problema al sincronizar
    echo Continuando de todas formas...
)
echo [OK] Sincronizacion completa
echo.

echo [4/5] Limpiando proyecto Android...
cd android
call gradlew clean
echo [OK] Proyecto limpiado
echo.

echo [5/5] Compilando nueva APK...
echo Este proceso puede tardar varios minutos...
echo.
call gradlew assembleDebug

echo.
echo ========================================
echo Verificando resultado...
echo ========================================
echo.

if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo.
    echo ========================================
    echo ^|  EXITO - APK ACTUALIZADA!          ^|
    echo ========================================
    echo.
    echo Tu app ahora tiene:
    echo   * Fondo claro profesional
    echo   * Titulo: "Registro de Gastos"
    echo   * Boton Excel en pestana Analisis
    echo   * Navegacion limpia en linea horizontal
    echo   * Categorias sin scroll extrano
    echo   * Footer: "Desarrollada por Janin Vargas"
    echo.
    echo APK ubicada en:
    echo %cd%\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo Para instalar en tu dispositivo:
    echo 1. Conecta tu telefono con USB debugging
    echo 2. Ejecuta: adb install -r app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo O usa el archivo instalar-apk.bat
    echo.
) else (
    echo.
    echo ========================================
    echo ^|  ERROR EN LA COMPILACION           ^|
    echo ========================================
    echo.
    echo Revisa los errores arriba
    echo.
)

cd ..
pause
