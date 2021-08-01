import os
from pathlib import Path
import yaml

DEFAULT_CONFIG_FILE = Path(__file__).resolve().parent.parent.parent / "config/em_config.yml"

ENV_VAR_NAME = "ENTITY_MATCHING_CONFIG_FILE"


def init_config(config_file):
    """
    Initialize the CONFIG dictionary from the api configuration YAML file. Further,
    extend the configuration dictionary with new variables, where needed.
    Parameters
    ----------
    config_file: str or Path-like
        Path to the config file.
    """
    if not Path(config_file).exists():
        raise ValueError(f"{config_file} does not exist.")

    with open(config_file, "r") as f:
        config = yaml.full_load(f)

    return config


# Have to do this before even importing other parts
CONFIG_FILE = os.getenv(ENV_VAR_NAME)
if CONFIG_FILE is None:
    CONFIG_FILE = str(DEFAULT_CONFIG_FILE)
CONFIG = init_config(CONFIG_FILE)
