'use client';

import { Button, useWatchForm } from '@payloadcms/ui';
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
    <Button url={url} el={'anchor'} newTab className={'full-width no-margin'}>
      {props.label}
    </Button>
  );
}
