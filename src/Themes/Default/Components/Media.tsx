    'use client';

    import React from 'react';
    import type { ComponentProps } from 'react';
    import NextImage from 'next/image';
    import ReactPlayer from 'react-player';
    export type ReactPlayerProps = ComponentProps<typeof ReactPlayer>;
    import { useTheme } from '@/Themes/ThemeProvider';
    import { ImageProps } from '@/Themes/Default/Components/Image'

    export type MediaType = 'image' | 'fileVideo' | 'embeddedVideo';

    export type ImageMediaItem = {
    type: 'image';
    src: string;
    alt?: string;
    imageProps?: Omit<ImageProps, 'src' | 'alt'>;
    };

    export type FileVideoMediaItem = {
    type: 'fileVideo';
    src: string;
    thumbnail?: string;
    videoProps?: Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'>;
    };

    export type EmbeddedVideoMediaItem = {
    type: 'embeddedVideo';
    src: string;
    playerProps?: Omit<ReactPlayerProps, 'src'>;
    };

    // Union of all types
    export type MediaItem =
    | ImageMediaItem
    | FileVideoMediaItem
    | EmbeddedVideoMediaItem;

    export interface MediaTheme {
    className?: string;
    style?: React.CSSProperties;
    }

    export interface MediaProps extends Partial<MediaTheme> {
    item: MediaItem;
    }

    export function MediaCmp(props: MediaProps) {
    const { theme: activeTheme } = useTheme();
    const theme: MediaTheme = activeTheme.components.media.theme;

    const Image = activeTheme.components.image.cmp;

    const finalClassName = [theme.className, props.className].filter(Boolean).join(' ');
    const finalStyle: React.CSSProperties = {
        ...(theme.style ?? {}),
        ...(props.style ?? {}),
    };

    switch (props.item.type) {
        case 'image':
        return (
            <Image
            src={props.item.src}
            alt={props.item.alt || ''}
            className={`object-cover ${finalClassName}`}
            style={finalStyle}
            {...props.item.imageProps}
            />
        );
        case 'fileVideo':
        return (
            <video
            src={props.item.src}
            className={`w-full h-full object-cover ${finalClassName}`}
            style={finalStyle}
            {...props.item.videoProps}
            />
        );
        case 'embeddedVideo':
        return (
            <ReactPlayer
            src={props.item.src}
            width="100%"
            height="100%"
            controls
            className={finalClassName}
            style={finalStyle}
            {...props.item.playerProps}
            />
        );
        default:
        return null;
    }
    }
