type IconProps = {
    fill: string;
    size: string;
};

export function CheckCircleIcon({fill, size}: IconProps){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} fill={fill} viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
        )
}

export function CircleIcon({fill, size}: IconProps){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} fill={fill} viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
        )
}

