import sys
import os
import pkgutil
import importlib

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def find_class_in_module(module, class_name):
    if hasattr(module, class_name):
        return module.__name__
    
    if hasattr(module, '__path__'):
        for _, name, is_pkg in pkgutil.iter_modules(module.__path__):
            try:
                sub_module_name = module.__name__ + '.' + name
                sub_module = importlib.import_module(sub_module_name)
                res = find_class_in_module(sub_module, class_name)
                if res:
                    return res
            except Exception:
                pass
    return None

import google.adk
print("Searching for InvocationContext...")
res = find_class_in_module(google.adk, "InvocationContext")
print(f"Found in: {res}")
