import logging
import logging.config
import json
import os

log_file_path = ''


def configure_logging_from_file(file='logger.json'):
    global log_file_path
    try:
        config_file_path = os.path.join(os.getcwd(), file)
        log_file_path = config_file_path
        with open(config_file_path, 'r') as source:
            configuration = json.load(source)
            logging.config.dictConfig(configuration)

    except Exception as e:
        raise FileExistsError(
            'Could not find logging configuration! error: {0}'.format(e))


def get_logger(logger_name, level="debug", capture_warnings=False):
    """
    This function returns a python logger with the desired settings:
    We encourage the use of the following levels from less serious to more
    serious: 'DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'

    :param logger_name: string the name of the logger
    :param level:
    :param capture_warnings:
    :return: a python logger
    """
    logging.captureWarnings(capture_warnings)
    return logging.getLogger('{}.{}'.format(logger_name, level))
