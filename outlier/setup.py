"""
Setup file for module
"""

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

required = []
with open('requirements.txt') as f:
    required = f.read().splitlines()

config = {
    'description': 'Project Outlier Classifier',
    'author': 'Vassilis Papapanagiotou',
    'url': 'https://gitlab.com/nexiot-ag/devops/ds/algorithms/outlier_classifier',
    'download_url': 'git@gitlab.com:nexiot-ag/devops/ds/algorithms/outlier_classifier.git',
    'author_email': 'vassilis.papapanagiotou@nexiot.ch',
    'version': '1.0',
    'install_requires': required,
    'packages': [],
    'scripts': [],
    'name': 'outlier_classifier'
}

setup(**config)
