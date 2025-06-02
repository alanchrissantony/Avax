type IconProps = {
    fill: string;
    size: string;
};

export function DownArrowIcon({fill, size}: IconProps){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={fill}><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
    )
}

export function FilledUpArrow(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF" style={{ margin: '1rem' }}><path d="m280-400 200-200 200 200H280Z" /></svg>
        )
}

export function UpArrowIcon({fill, size}: IconProps){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={fill}><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
    )
}

export function RightArrowIcon({fill, size}: IconProps){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} fill={fill} viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
    )
}