'use client';

import { useWatchForm } from '@payloadcms/ui';
import React, { useMemo } from 'react';

export function CustomButton(props: { url: string; label: string }) {
  const { getData } = useWatchForm();

  const url = useMemo(() => {
    let tempUrl = props.url;

    for (const key in getData()) {
      tempUrl = tempUrl.replace(`:${key}`, getData()[key]);
    }

    return tempUrl;
  }, [props]);

  return (
    <div>
      <a
        href={url}
        target={'_blank'}
        rel={'noreferrer'}
        style={{ width: '100%', textAlign: 'center', alignSelf: 'start' }}
        className={
          'btn btn--icon-style-without-border btn--withoutPopup btn--style-primary btn--size-large'
        }
      >
        {props.label}
      </a>
    </div>
  );
}
