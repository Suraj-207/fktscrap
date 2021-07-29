import logging as lg
from .db_handler import DB_Handler


class Logger:

    def __init__(self, program_name):
        """

        :param program_name: Name of the program that the logger is associated with.
        """
        self.program_name = program_name
        lg.basicConfig(level=lg.DEBUG, format='%(name)s - %(asctime)s - %(levelname)s - %(message)s')
        format1 = lg.Formatter('%(name)s - %(asctime)s - %(levelname)s - %(message)s')
        
        backup_logger = lg.getLogger('backup_logger')
        file_handler = lg.FileHandler('file.log')
        file_handler.setLevel(lg.DEBUG)
        file_handler.setFormatter(format1)
        backup_logger.addHandler(file_handler)

        self.db_logger = lg.getLogger('logger')
        db_handler = DB_Handler(backup_logger_name='backup_logger')
        db_handler.setLevel(lg.DEBUG)
        db_handler.setFormatter(format1)
        self.db_logger.addHandler(db_handler)

    def log(self, levelname, message):
        """

        :param levelname: info, debug, warning, error or critical.
        :param message: log message
        :return: None
        """
        levelname = levelname.upper()
        if levelname == "INFO":
            self.db_logger.info(self.program_name + " : " + message)
        elif levelname == "DEBUG":
            self.db_logger.debug(self.program_name + " : " + message)
        elif levelname == "WARNING":
            self.db_logger.warning(self.program_name + " : " + message)
        elif levelname == "ERROR":
            self.db_logger.error(self.program_name + " : " + message)
        elif levelname == "CRITICAL":
            self.db_logger.critical(self.program_name + " : " + message)

