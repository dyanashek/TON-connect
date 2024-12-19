import base64
import re
from tonsdk.utils import b64str_to_bytes
from tonsdk.boc import Cell
from django.core.management import BaseCommand


class Command(BaseCommand):
    def _parse_cell(self, cell):
        result = {}
        # Читаем uint32 (OP code)
        print(1)
        result['op_code'] = cell.bits.read_uint(32)
        print(2)
        # Читаем uint64 (query_id)
        result['query_id'] = cell.bits.read_uint(64)
        # Читаем сумму (coins)
        result['amount'] = cell.bits.read_coins()
        # Читаем адрес назначения
        result['destination'] = cell.bits.read_address().to_string(1) if cell.bits.read_address() else None
        # Читаем адрес ответа
        result['response_destination'] = cell.bits.read_address().to_string(1) if cell.bits.read_address() else None
        # Читаем 1 бит для custom_payload
        result['custom_payload'] = cell.bits.read_uint(1)
        # Читаем forward_ton_amount
        result['forward_ton_amount'] = cell.bits.read_coins()
        # Читаем 1 бит для forward_payload
        result['forward_payload'] = cell.bits.read_uint(1)
        return result

    def handle(self, *args, **options):
        boc_base64 = "te6cckECFgEAArEAAgE0ARUBFP8A9KQT9LzyyAsCAgEgAw4CAUgEBQLc0CDXScEgkVuPYyDXCx8gghBleHRuvSGCEHNpbnS9sJJfA+CCEGV4dG66jrSAINchAdB01yH6QDD6RPgo+kQwWL2RW+DtRNCBAUHXIfQFgwf0Dm+hMZEw4YBA1yFwf9s84DEg10mBAoC5kTDgcOIREAIBIAYNAgEgBwoCAW4ICQAZrc52omhAIOuQ64X/wAAZrx32omhAEOuQ64WPwAIBSAsMABezJftRNBx1yHXCx+AAEbJi+1E0NcKAIAAZvl8PaiaECAoOuQ+gLAEC8g8BHiDXCx+CEHNpZ2668uCKfxAB5o7w7aLt+yGDCNciAoMI1yMggCDXIdMf0x/TH+1E0NIA0x8g0x/T/9cKAAr5AUDM+RCaKJRfCtsx4fLAh98Cs1AHsPLQhFEluvLghVA2uvLghvgju/LQiCKS+ADeAaR/yMoAyx8BzxbJ7VQgkvgP3nDbPNgRA/btou37AvQEIW6SbCGOTAIh1zkwcJQhxwCzji0B1yggdh5DbCDXScAI8uCTINdKwALy4JMg1x0GxxLCAFIwsPLQiddM1zkwAaTobBKEB7vy4JPXSsAA8uCT7VXi0gABwACRW+Dr1ywIFCCRcJYB1ywIHBLiUhCx4w8g10oSExQAlgH6QAH6RPgo+kQwWLry4JHtRNCBAUHXGPQFBJ1/yMoAQASDB/RT8uCLjhQDgwf0W/LgjCLXCgAhbgGzsPLQkOLIUAPPFhL0AMntVAByMNcsCCSOLSHy4JLSAO1E0NIAURO68tCPVFAwkTGcAYEBQNch1woA8uCO4sjKAFjPFsntVJPywI3iABCTW9sx4ddM0ABRgAAAAD///4iUDlQS5zKL114+bN6qGXvBroZlQ4Xt/tlEgF5ARkYszqBTsDOt"
        boc_bytes = b64str_to_bytes(boc_base64)
        root_cell: Cell = Cell.one_from_boc(boc_bytes)
        #parsed_data = self._parse_cell(root_cell)
        print(root_cell.tree_walk())
        slice_obj = root_cell.begin_parse()
        print(slice_obj)
        print(slice_obj.read_bit())
        print(slice_obj.read_bits(6))
        print(slice_obj.read_bytes(0))
        #print(slice_obj.read_coins())
        #print(slice_obj.read_msg_addr())
        print(slice_obj.read_string(128))
        #print(slice_obj.read_uint(0))
        