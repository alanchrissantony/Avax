import Header from "@/components/general/Header";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {Sidebar} from "@/components/general/Siderbar";
import {getCookie, setCookie} from 'cookies-next';
import {useEffect, useState} from "react";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";


interface Props {
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
  bgGradient?: string;
}

export default function MainSection({
                                      children,
                                      bgColor = "#202020",
                                      className,
                                      bgGradient = '',
                                    }: Props) {
  const [defaultLayout, setDefaultLayout] = useState<number[]>([20, 80]);
  const [isLayoutLoaded, setIsLayoutLoaded] = useState(false);

  useEffect(() => {
    const value = getCookie("react-resizable-panels:layout");

    if (value) {
      try {
        setDefaultLayout(JSON.parse(value as string));
      } catch (e) {
        console.error("Failed to parse layout from cookie:", e);
        setCookie("react-resizable-panels:layout", JSON.stringify([20, 80]));
      }
    } else {
      setCookie("react-resizable-panels:layout", JSON.stringify([20, 80]));
    }

    setIsLayoutLoaded(true);
  }, []);

  const handleLayoutChange = (sizes: number[]) => {
    setDefaultLayout(sizes);
    setCookie("react-resizable-panels:layout", JSON.stringify(sizes));
  };

  if (!isLayoutLoaded) {
    return <FullScreenSpinner className="h-[calc(95vh-4rem)]"/>
  }


  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={handleLayoutChange}
      className="h-full items-stretch"
    >
      <ResizablePanel defaultSize={defaultLayout?.[0] || 20} minSize={20} maxSize={45} className="min-w-60">
        <Sidebar/>
      </ResizablePanel>
      <ResizableHandle className="bg-black/0 hover:bg-white/40 my-4 mx-1 cursor-grab active:cursor-grabbing"/>
      <ResizablePanel defaultSize={defaultLayout?.[1] || 80}>
        <div className="grid grid-cols-8">
          <div
            className="flex flex-col h-[calc(95vh-4rem)] bg-[#131313] w-auto overflow-auto col-span-8 rounded-lg mt-2 mr-2">
            <main>
              <div
                className={`h-full w-full rounded-lg ${className}`}
                style={{
                  backgroundImage: `linear-gradient(to bottom, ${bgColor} 0%, #131313 ${bgGradient}, #131313 100%)`,
                }}
              >
                <Header/>
                {children}
              </div>
            </main>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}