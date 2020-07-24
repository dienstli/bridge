#!/usr/bin/env python
"""
Docstring
"""
# === Imports here ===
# Add python lib imports here
from os import environ, path
from pathlib import Path
from time import sleep

# Add third party python imports here

# Add project module imports here
from distutils.util import strtobool
from log import logger

__author__ = "Vassilis Papapanagiotou"
__copyright__ = "Copyright 2018, Nexiot AG"
__credits__ = ["Vassilis Papapanagiotou"]
__license__ = "Nexiot AG"
__version__ = "0.0.0"
__maintainer__ = "Vassilis Papapanagiotou"
__email__ = "vassilis.papapanagiotou@nexiot.ch"
__status__ = "[production, qa, development, prototype]"

ENVIRONMENT = environ.get("ENVIRONMENT", "local")
if ENVIRONMENT == "local":
    from dotenv import load_dotenv

    # makes sure this is called before any application modules are imported!
    ROOT = Path(__file__).parents[1]
    load_dotenv(ROOT.joinpath(".env" if ROOT.joinpath(".env").exists() else ".env.example"))


def _service_version():
    root_dir = path.realpath(path.dirname(__file__))
    file = path.join(root_dir, ".version")
    if path.exists(file):
        with open(file, "r") as ver:
            return ver.readline().strip()
    else:
        return "LOCAL"


def _as_list(urls_string):
    if urls_string is not None:
        return [x.strip() for x in urls_string.split(",")]
    else:
        return None


def _as_bool(obj):
    return bool(strtobool(str(obj)))


def get_variable_or_die(var_name, default=None):
    """

    :param var_name:
    :param default:
    :return:
    """
    if environ.get(var_name) is None and default is None:
        raise EnvironmentError(
            "Please set the environment variable {0} for outlier_classifier to"
            " work, path of .env returned {1}".format(var_name, path)
        )
    else:
        return environ.get(var_name, default)


def backoff_forever_retry(func, lg, *args, **kwargs):
    """
    wrap func calls with backoff retry logic
    Only use it for th cases where you know something has to be there
    For example: don;t use it if the read only user cannot connect to db, that would be and error for which the app
    exit with 0
    :param func:
    :param lg: logger
    :param args:
    :param kwargs:
    :return:
    """
    retries = 0
    while True:
        try:
            return func(*args, **kwargs)
        except Exception as ex:
            lg.error("exception: {}".format(ex))
            retries += 1
            lg.debug("Next retry will happen in {} secs".format(10 * retries))
            sleep(10 * retries)


def get_aws_param(params, name, default):
    """

    :param params:
    :param name:
    :param default:
    :return:
    """
    return params[name] if name in params else default


# -----------------------------------------------------------------------------
# CONFIGS
# -----------------------------------------------------------------------------
SERVICE_NAME = environ.get("SERVICE_NAME", "outlier_classifier")

LOG_LEVEL = get_variable_or_die("LOG_LEVEL", "debug").lower()
ROOT_DIR = Path(__file__).parents[1]

logger.configure_logging_from_file(ROOT_DIR.joinpath("log/logger.json"))
service_logger = logger.get_logger("outlier_classifier", level=LOG_LEVEL, capture_warnings=True)

SM_REGION = get_variable_or_die("SM_REGION", "eu-central-1")

# -----------------------------------------------------------------------------
# DATADOG
# -----------------------------------------------------------------------------

NEXIOT_ENV = get_variable_or_die("NEXIOT_ENV", "preview")
DD_PHASE = get_variable_or_die("DD_PHASE", "prd")
DD_STAGE = get_variable_or_die("DD_STAGE", "preview")
DD_OWNER = get_variable_or_die("DD_OWNER", "ds")

DD_API_KEY = get_variable_or_die("DD_API_KEY", "")
DATADOG_AGENT_HOST = environ.get("DATADOG_AGENT_HOST", None)
DATADOG_AGENT_PORT = int(get_variable_or_die("DATADOG_AGENT_PORT", 8125))
DATADOG_SERVICE_NAMESPACE = get_variable_or_die("DATADOG_SERVICE_NAMESPACE", "outlier_classifier")

# -----------------------------------------------------------------------------
# Postgres
# -----------------------------------------------------------------------------

POSTGRES_PORT = get_variable_or_die("POSTGRES_PORT", 5432)
DATABASE_NAME = get_variable_or_die("POSTGRES_DB", "oltp")
DATABASE_SCHEMA = get_variable_or_die("DATABASE_SCHEMA", "pwp")

POSTGRES_WRITE_HOST = get_variable_or_die("POSTGRES_WRITE_HOST", "")
POSTGRES_READ_HOST = get_variable_or_die("POSTGRES_READ_HOST", "")

POSTGRES_WRITE_USER_NAME = get_variable_or_die("POSTGRES_WRITE_USER_NAME", "ds_user")
POSTGRES_WRITE_USER_PASSWORD = get_variable_or_die("POSTGRES_WRITE_USER_PASSWORD", "docker")
POSTGRES_READ_USER_NAME = get_variable_or_die("POSTGRES_READ_USER_NAME", "ds_user")
POSTGRES_READ_USER_PASSWORD = get_variable_or_die("POSTGRES_READ_USER_PASSWORD", "docker")

# -----------------------------------------------------------------------------
# Kafka
# -----------------------------------------------------------------------------

KAFKA_BOOTSTRAP_SERVERS = get_variable_or_die("KAFKA_BOOTSTRAP_SERVERS", "kafka:29092")
KAFKA_CLIENT_ID = get_variable_or_die("KAFKA_CLIENT_ID", SERVICE_NAME)
KAFKA_TOPIC = get_variable_or_die("KAFKA_TOPIC", "wp")
KAFKA_GROUP_ID = get_variable_or_die("KAFKA_GROUP_ID", "test")

KAFKA_HEARTBEAT_INTERVAL_MS = int(get_variable_or_die("KAFKA_HEARTBEAT_INTERVAL_MS", 3000))
KAFKA_SESSION_TIMEOUT_MS = int(get_variable_or_die("KAFKA_SESSION_TIMEOUT_MS", 10000))
KAFKA_POLL_INTERVAL_MS = int(get_variable_or_die("KAFKA_POLL_INTERVAL_MS", 300_000))
KAFKA_MAX_POLL_RECORDS = int(get_variable_or_die("KAFKA_MAX_POLL_RECORDS", 50))
KAFKA_AUTOCOMMIT_INTERVAL_MS = int(get_variable_or_die("KAFKA_AUTOCOMMIT_INTERVAL_MS", 1000))


# -----------------------------------------------------------------------------
# Secret Manager
# -----------------------------------------------------------------------------

SM_AURORA_POSTGRES_WRITE_USER_NAME = get_variable_or_die(
    "SM_AURORA_POSTGRES_WRITE_USER_NAME", "nx-ops/databases/oltp-postgresql/rw_user"
)

SM_AURORA_POSTGRES_READ_USER_NAME = get_variable_or_die(
    "SM_AURORA_POSTGRES_READ_USER_NAME", "nx-ops/databases/oltp-postgresql/ro_user"
)

if not (ENVIRONMENT == "local"):

    from ds_utilities.aws.ssm_client import BotoSSMClient

    ssm_client = BotoSSMClient(None, SM_REGION)
    aws_params = ssm_client.get_parameters(["/nx-ops-secrets/kafka/bootstrap_servers"])

    service_logger.debug("Retrieve kafka bootstrap server information ...")
    KAFKA_BOOTSTRAP_SERVERS = get_aws_param(aws_params, "/nx-ops-secrets/kafka/bootstrap_servers", None)

    # --------------------------------------------------------------------------
    # Postgres
    # --------------------------------------------------------------------------
    from ds_utilities.aws.ssm_client import BotoSSMClient

    ssm_client = BotoSSMClient(None, SM_REGION)
    aws_params = ssm_client.get_parameters(["/nx-sre4ops/monitoring/datadog-agent/api-key"])

    service_logger.info("Retrieve nexiot datadog agent api key ...")
    DD_API_KEY = get_aws_param(aws_params, "/nx-sre4ops/monitoring/datadog-agent/api-key", None)

    from ds_utilities.aws_client import AWSClient
    from log import logger
    from pathlib import Path

    sm_client = AWSClient("secretsmanager", SM_REGION, service_logger, endpoint_url=None, credentials=None)

    service_logger.info("Retrieve database writer user information ...")
    write_secret = backoff_forever_retry(sm_client.get_secret, service_logger, SM_AURORA_POSTGRES_WRITE_USER_NAME)
    POSTGRES_PORT = write_secret["port"]
    DATABASE_NAME = write_secret["databases"]
    DATABASE_SCHEMA = write_secret["schemas"]

    POSTGRES_WRITE_HOST = write_secret["host"]
    POSTGRES_WRITE_USER_NAME = write_secret["username"]
    POSTGRES_WRITE_USER_PASSWORD = write_secret["password"]

    service_logger.info("Retrieve database reader user information ...")
    read_secret = backoff_forever_retry(sm_client.get_secret, service_logger, SM_AURORA_POSTGRES_READ_USER_NAME)

    POSTGRES_READ_HOST = read_secret["host"]
    POSTGRES_READ_USER_NAME = read_secret["username"]
    POSTGRES_READ_USER_PASSWORD = read_secret["password"]
