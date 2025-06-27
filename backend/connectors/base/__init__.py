import json
import logging
import random

import requests


class BaseConnector:
    def _request(
        self, method, url, params=None, data=None, headers=None
    ) -> requests.Response:
        return requests.request(method, url, params=params, data=data, headers=headers)

    def _log_error(self, module_function_name: str, response: requests.Response) -> int:
        random_int = random.randint(1, 100000000)

        logging.error(
            f"[ERROR] {module_function_name} -> "
            f"[Client error number: {random_int}]"
            f"[Status:{response.status_code} {response.request.path_url}]"
            f"[Response:{response.content}]"
        )

        return random_int
