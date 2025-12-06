import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

interface DetailModalProps {
  tool: {
    id: string;
    name: string;
    icon: React.ElementType;
  };
  onClose: () => void;
}

export const DetailModal = ({ tool, onClose }: DetailModalProps) => {
  const Icon = tool.icon;

  const renderContent = () => {
    if (tool.id === "audio") {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-6 max-w-md">
            <Icon className="h-16 w-16 text-primary mx-auto" />
            <h3 className="text-xl font-semibold">{tool.name}</h3>
            <div className="space-y-4">
              <AudioPlayer
                src="/data/audio.mp3"
                autoPlay={false}
              />
              <p className="text-sm text-muted-foreground">
                Audio summary player for the specified data audio file.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (tool.id === "compare") {
      return (
        <div className="h-full">
          <iframe
            src="https://lawdiff-explorer.lovable.app/"
            className="w-full h-full border-0 rounded-lg"
            title="LawDiff Explorer"
            allow="geolocation; microphone; camera; midi; encrypted-media;"
          />
        </div>
      );
    }

    if (tool.id === "video") {
      const images = [
        { original: "/data/presentation/file_page-0001.jpg", thumbnail: "/data/presentation/file_page-0001.jpg" },
        { original: "/data/presentation/file_page-0002.jpg", thumbnail: "/data/presentation/file_page-0002.jpg" },
        { original: "/data/presentation/file_page-0003.jpg", thumbnail: "/data/presentation/file_page-0003.jpg" },
        { original: "/data/presentation/file_page-0004.jpg", thumbnail: "/data/presentation/file_page-0004.jpg" },
        { original: "/data/presentation/file_page-0005.jpg", thumbnail: "/data/presentation/file_page-0005.jpg" },
        { original: "/data/presentation/file_page-0006.jpg", thumbnail: "/data/presentation/file_page-0006.jpg" },
        { original: "/data/presentation/file_page-0007.jpg", thumbnail: "/data/presentation/file_page-0007.jpg" },
        { original: "/data/presentation/file_page-0008.jpg", thumbnail: "/data/presentation/file_page-0008.jpg" },
        { original: "/data/presentation/file_page-0009.jpg", thumbnail: "/data/presentation/file_page-0009.jpg" },
      ];

      return (
        <div className="flex items-center justify-center h-full">
          <div className="w-full h-full flex flex-col">
            <div className="text-center mb-4">
              <Icon className="h-8 w-8 text-primary inline-block mr-2" />
              <h3 className="text-lg font-semibold inline">{tool.name}</h3>
            </div>
            <div className="flex-1 overflow-auto border rounded-lg bg-white">
              <ImageGallery
                items={images}
                autoPlay={true}
                slideInterval={3000}
              />
            </div>
          </div>
        </div>
      );
    }

    // Default placeholder for other tools
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4 max-w-md">
          <Icon className="h-16 w-16 text-primary mx-auto" />
          <h3 className="text-xl font-semibold">{tool.name}</h3>
          <p className="text-muted-foreground">
            This panel will display detailed information and functionality for {tool.name.toLowerCase()}.
            Future implementations could include interactive content, visualizations, or embedded applications.
          </p>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`${tool.id === 'compare' ? 'max-w-full h-screen' : tool.id === 'video' ? 'max-w-6xl' : tool.id === 'audio' ? 'max-w-4xl' : 'max-w-3xl'} ${tool.id === 'compare' ? '' : tool.id === 'video' ? 'h-[95vh]' : tool.id === 'audio' ? 'h-[80vh]' : 'h-[70vh]'}`}>
        <div className={`${tool.id === 'compare' ? 'flex-1' : tool.id === 'audio' || tool.id === 'video' ? 'flex items-center justify-center h-full' : 'flex-1 overflow-auto border rounded-lg bg-accent/30 p-4'}`}>
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
