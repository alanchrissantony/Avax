type IconProps = {
    fill: string;
};

export function DownArrowIcon({fill}: IconProps){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={fill}><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
    )
}

export function FilledUpArrow(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF" style={{ margin: '1rem' }}><path d="m280-400 200-200 200 200H280Z" /></svg>
        )
}

export function UpArrowIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
    )
}
