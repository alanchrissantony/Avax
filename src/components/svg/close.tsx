type IconProps = {
    fill: string;
    size: string;
};

export default function CloseIcon({fill, size}: IconProps){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={fill}><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        )
}