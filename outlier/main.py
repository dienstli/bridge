#!/usr/bin/env python
"""
Docstring
"""
# === Imports here ===
# Add python lib imports here

# Add third party python imports here
from databases.postgres.client import PostgresClient
from datadog import initialize, statsd
from kafka import KafkaConsumer

# Add project module imports here
from app.config import service_logger as lg
from app.config import (
    DATABASE_NAME,
    DATABASE_SCHEMA,
    DATADOG_AGENT_HOST,
    DATADOG_AGENT_PORT,
    DATADOG_SERVICE_NAMESPACE,
    DD_API_KEY,
    DD_STAGE,
    DD_PHASE,
    DD_OWNER,
    KAFKA_AUTOCOMMIT_INTERVAL_MS,
    KAFKA_BOOTSTRAP_SERVERS,
    KAFKA_CLIENT_ID,
    KAFKA_GROUP_ID,
    KAFKA_HEARTBEAT_INTERVAL_MS,
    KAFKA_MAX_POLL_RECORDS,
    KAFKA_POLL_INTERVAL_MS,
    KAFKA_SESSION_TIMEOUT_MS,
    KAFKA_TOPIC,
    NEXIOT_ENV,
    POSTGRES_PORT,
    POSTGRES_READ_HOST,
    POSTGRES_READ_USER_NAME,
    POSTGRES_READ_USER_PASSWORD,
    POSTGRES_WRITE_HOST,
    POSTGRES_WRITE_USER_NAME,
    POSTGRES_WRITE_USER_PASSWORD,
)

from app.message_processor import consume_kafka_messages

__author__ = "Vassilis Papapanagiotou"
__copyright__ = "Copyright 2018, Nexiot AG"
__credits__ = ["Vassilis Papapanagiotou"]
__license__ = "Nexiot AG"
__version__ = "0.0.0"
__maintainer__ = "Vassilis Papapanagiotou"
__email__ = "vassilis.papapanagiotou@nexiot.ch"
__status__ = "[production, qa, development, prototype]"


if __name__ == "__main__":
    """
    """
    lg.info("{}.{} started ...".format(NEXIOT_ENV, DATADOG_SERVICE_NAMESPACE))

    statsd_use_default_route = False if DATADOG_AGENT_HOST is not None else True
    lg.info("statsd default route: {}".format(statsd_use_default_route))
    initialize(
        api_key=DD_API_KEY,
        statsd_host=DATADOG_AGENT_HOST,
        statsd_port=DATADOG_AGENT_PORT,
        statsd_use_default_route=statsd_use_default_route,
    )
    statsd.namespace = "{}".format(DATADOG_SERVICE_NAMESPACE)
    statsd.constant_tags = ["stage:" + DD_STAGE, "phase:" + DD_PHASE, "env:" + NEXIOT_ENV, "owner:" + DD_OWNER]
    statsd.use_ms = True

    # Get devices
    pg_read_client = PostgresClient(
        POSTGRES_READ_HOST, POSTGRES_PORT, POSTGRES_READ_USER_NAME, POSTGRES_READ_USER_PASSWORD
    )
    pg_write_client = PostgresClient(
        POSTGRES_WRITE_HOST, POSTGRES_PORT, POSTGRES_WRITE_USER_NAME, POSTGRES_WRITE_USER_PASSWORD
    )
    pg_read_client.connect_to_db(DATABASE_NAME, schema=DATABASE_SCHEMA, auto_commit=True)
    pg_write_client.connect_to_db(DATABASE_NAME, schema=DATABASE_SCHEMA, auto_commit=True)
    lg.info("connected to postgres")

    lg.info("connecting to kafka")
    # https://kafka-python.readthedocs.io/en/master/apidoc/KafkaConsumer.html
    lg.debug("bootstrap servers: {}".format(KAFKA_BOOTSTRAP_SERVERS))
    lg.debug("client id: {}".format(KAFKA_CLIENT_ID))
    lg.debug("group id: {}".format(KAFKA_GROUP_ID))
    lg.debug("topic: {}".format(KAFKA_TOPIC))

    kafka_consumer = KafkaConsumer(
        KAFKA_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        client_id=KAFKA_CLIENT_ID,
        group_id=KAFKA_GROUP_ID,
        auto_offset_reset="earliest",
        enable_auto_commit=True,
        key_deserializer=lambda x: x.decode("utf-8"),
        retry_backoff_ms=100,
        reconnect_backoff_ms=50,
        reconnect_backoff_max_ms=1000,
        auto_commit_interval_ms=KAFKA_AUTOCOMMIT_INTERVAL_MS,
        heartbeat_interval_ms=KAFKA_HEARTBEAT_INTERVAL_MS,
        session_timeout_ms=KAFKA_SESSION_TIMEOUT_MS,
        max_poll_interval_ms=KAFKA_POLL_INTERVAL_MS,
        max_poll_records=KAFKA_MAX_POLL_RECORDS,
    )
    kafka_consumer.subscribe(KAFKA_TOPIC)
    lg.info("connected to kafka and subscribed to {} topic".format(KAFKA_TOPIC))

    lg.info(
        {
            "auto_commit_interval_ms": KAFKA_AUTOCOMMIT_INTERVAL_MS,
            "heartbeat_interval_ms": KAFKA_HEARTBEAT_INTERVAL_MS,
            "session_timeout_ms": KAFKA_SESSION_TIMEOUT_MS,
            "max_poll_interval_ms": KAFKA_POLL_INTERVAL_MS,
            "max_poll_records": KAFKA_MAX_POLL_RECORDS,
        }
    )
    lg.info(f"{kafka_consumer.config}")

    cache = dict()
    consume_kafka_messages(
        kafka_consumer, pg_read_client, pg_write_client, DATABASE_NAME, DATABASE_SCHEMA, cache, logger=lg
    )
