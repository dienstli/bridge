from os import path

import logging
import logging.config

log_file_path = path.join(path.dirname(path.abspath(__file__)), "../../config/logging.conf")
logging.config.fileConfig(log_file_path, disable_existing_loggers=False)


def get_logger(logger_name):
    return logging.getLogger(logger_name)
