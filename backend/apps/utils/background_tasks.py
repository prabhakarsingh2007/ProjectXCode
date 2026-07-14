from concurrent.futures import ThreadPoolExecutor
import logging

logger = logging.getLogger('projectxcode')

# Global ThreadPoolExecutor instance with 4 worker threads
_executor = ThreadPoolExecutor(max_workers=4)

def run_in_background(func, *args, **kwargs):
    """
    Schedules a callable function to be run asynchronously in the background.
    If scheduling fails, falls back to synchronous execution.
    """
    try:
        _executor.submit(func, *args, **kwargs)
        logger.info(f"Task '{func.__name__}' successfully scheduled in the background.")
    except Exception as e:
        logger.error(f"Failed to submit task to background executor: {str(e)}")
        # Synchronous fallback to ensure the operation completes
        func(*args, **kwargs)
