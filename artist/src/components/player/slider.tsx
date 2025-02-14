import { Slider } from "@heroui/slider";

export default function SoundControls() {
    return (
        <Slider
            className="max-w-md"
            defaultValue={50}
            maxValue={100}
            minValue={0}
            step={1}
            color={"success"}
            size="sm"
        />
    );
}
