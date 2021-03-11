# This script takes last chromedriver version and insert it into .env file
# If .env file doesn't exists, the script creates a new file
# The script is overwriting an old value of CHROME_DRIVER_VERSION

ENV_FILE_PATH=.env

RESULT="$(wget -qO- https://chromedriver.storage.googleapis.com/LATEST_RELEASE)"

echo "Got latest chrome driver version $RESULT"

if test -f "$ENV_FILE_PATH"; then
    grep -v CHROME_DRIVER_VERSION $ENV_FILE_PATH > temp
    mv temp $ENV_FILE_PATH

fi

echo "CHROME_DRIVER_VERSION=$RESULT" >> $ENV_FILE_PATH
echo "Set chromedriver version in .env to $RESULT"