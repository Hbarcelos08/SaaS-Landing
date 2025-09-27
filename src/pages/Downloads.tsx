import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_size: string;
  category: string;
  created_at: string;
}

export default function Downloads() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const { data, error } = await supabase
          .from('downloads')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDownloads(data || []);
      } catch (error) {
        console.error('Error fetching downloads:', error);
        toast({
          title: "Error",
          description: "Failed to load downloads. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, [toast]);

  const handleDownload = (fileUrl: string, title: string) => {
    // Simulate download
    toast({
      title: "Download started",
      description: `${title} is being downloaded.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Download <span className="bg-gradient-primary bg-clip-text text-transparent">Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access our comprehensive collection of guides, templates, and resources to help you succeed.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {downloads.map((item) => (
                <Card key={item.id} className="bg-card/50 border-primary/20 hover:bg-card/70 transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {item.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Size: {item.file_size}
                      </span>
                      <Button
                        onClick={() => handleDownload(item.file_url, item.title)}
                        className="gradient-primary text-background"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && downloads.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-2">No downloads available</h3>
              <p className="text-muted-foreground">Check back later for new resources.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}