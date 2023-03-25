import { toast } from 'react-hot-toast';
import { XIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/utils';
import { FireIcon } from '@heroicons/react/24/solid';
import { cloneElement } from 'react';

export const defaultToast = (message, icon) => {
  toast.custom((t) => (
    <div
      id="toast-default"
      className={classNames(
        t.visible ? 'animate-enter' : 'animate-leave',
        'flex items-center w-max max-w-xs p-4 text-neutral-500 bg-white rounded-lg shadow'
      )}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-neutral-500 rounded-lg">
        {icon ? (
          cloneElement(icon, {
            className: 'w-5 h-5',
          })
        ) : (
          <FireIcon className="w-5 h-5" />
        )}
      </div>
      <div className="ml-3 text-sm font-normal">
        {message || 'Message here!'}
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        type="button"
        className="ml-4 -mx-1.5 -my-1.5 bg-white text-neutral-400 hover:text-neutral-900 rounded-lg focus:ring-2 focus:ring-neutral-300 p-1.5 hover:bg-neutral-100 inline-flex justify-center items-center"
        data-dismiss-target="#toast-default"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  ));
};
