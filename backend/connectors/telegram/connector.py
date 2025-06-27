import asyncio

from django.conf import settings
from telegram import Bot
from requests import Response

from connectors.base import BaseConnector


class TelegramConnector(BaseConnector):
    async def _send_message_async(self, message: str) -> Response:
        """
        Send a message to Telegram channel using bot API
        Returns Response object with success/error info
        """
        if not settings.TELEGRAM_BOT_TOKEN or not settings.TELEGRAM_CHAT_ID:
            return {}

        try:
            bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
            await bot.send_message(
                chat_id=settings.TELEGRAM_CHAT_ID, text=message, parse_mode="HTML"
            )
            # Create a success Response object
            class SuccessResponse:
                def __init__(self):
                    self.status_code = 200
                    self.content = b"Message sent successfully"
                    self.request = type(
                        "Request", (), {"path_url": "telegram/send_message"}
                    )

            return SuccessResponse()
        except Exception as e:
            # Create an error Response object
            class ErrorResponse:
                def __init__(self, error):
                    self.status_code = 500
                    self.content = str(error).encode()
                    self.request = type(
                        "Request", (), {"path_url": "telegram/send_message"}
                    )

            return ErrorResponse(e)

    def send_message(self, message: str) -> bool:
        """Send a message to Telegram channel"""
        response = asyncio.run(self._send_message_async(message))

        if response.status_code != 200:
            self._log_error("send_message", response)
            return False

        return True
