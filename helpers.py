from haystack import Document

def read_from_file(file_name):
    """Read documents from file, one line - one document """
    with open(file_name, encoding="utf-8") as f:
        lines = f.readlines()
    return [Document(content=line) for line in lines]