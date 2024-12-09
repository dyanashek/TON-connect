import base64

from tonsdk.utils import to_nano, Address
from tonsdk.boc import Cell

from django.core.management import BaseCommand


class Command(BaseCommand):
    JETTON_TRANSFER_OP_CODE = 0x0f8a7ea5
    WALLET_DST = "UQADDjEaut665leQJ7z4ckDSG4RmA2O8vtpzLP6vWgZdSCGS"
    WALLET_SRC = "UQADDjEaut665leQJ7z4ckDSG4RmA2O8vtpzLP6vWgZdSCGS"

    def _create_internal_message(self):
        body = Cell()
        # storeUint (32 bits): Jetton transfer op code
        body.bits.write_uint(self.JETTON_TRANSFER_OP_CODE, 32)
        # storeUint (64 bits): query_id:uint64
        body.bits.write_uint(0, 64)
        # storeCoins: amount:(VarUInteger 16)
        body.bits.write_coins(to_nano(100, 'nanoton'))  # Jetton amount (TONs, decimals = 9 by default)
        # storeAddress: destination:MsgAddress
        body.bits.write_address(Address(self.WALLET_DST))
        # storeAddress: response_destination:MsgAddress
        body.bits.write_address(Address(self.WALLET_SRC))
        # storeUint (1 bit): custom_payload:(Maybe ^Cell)
        body.bits.write_uint(0, 1)
        # storeCoins: forward_ton_amount:(VarUInteger 16)
        body.bits.write_coins(to_nano(100, 'nanoton'))  # Forward TON amount
        # storeUint (1 bit): forward_payload:(Either Cell ^Cell)
        body.bits.write_uint(0, 1)

        return body

    def handle(self, *args, **options):  
        l = self._create_internal_message()
        print(base64.b64encode(l.to_boc()).decode("utf-8"))

