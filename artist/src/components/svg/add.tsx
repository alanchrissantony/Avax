type IconProps = {
    fill: string;
    size: string;
};

export default function AddIcon({ size, fill }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={fill}><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
    )
}

export function TrackAddIcon({ fill, size }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={fill}><path d="M480-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T560-418v-422h240v160H640v400q0 66-47 113t-113 47ZM280-520v-120H160v-80h120v-120h80v120h120v80H360v120h-80Z" /></svg>
    )
}