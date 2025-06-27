// src/app/analyze/page.tsx
"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Progress } from "~/components/ui/progress";
import { Badge } from "~/components/ui/badge";
import {
  Upload,
  Link,
  FileText,
  Image,
  Video,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";

export default function AnalyzePage() {
  const [activeTab, setActiveTab] = useState("url");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState({
    url: "",
    text: "",
    files: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setResults({
        status: "verified",
        confidence: 85,
        sources: ["Reuters", "AP News"],
        summary:
          "This content has been cross-referenced with verified sources and appears to be accurate.",
        details:
          "Analysis completed using multiple verification methods including source checking and content comparison.",
      });
      setIsAnalyzing(false);
    }, 5000);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) return <Image className="h-4 w-4" />;
    if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-foreground mb-2 text-3xl font-bold">
          Analyze Content for Accuracy
        </h1>
        <p className="text-muted-foreground text-lg">
          Submit news content to verify its authenticity using trusted sources
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="text-primary h-5 w-5" />
            How It Works
          </CardTitle>
          <CardDescription>
            Our system analyzes your content against verified truth sources to
            determine accuracy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-sm md:grid-cols-3">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full">
                1
              </div>
              <p className="font-medium">Submit Content</p>
              <p className="text-muted-foreground">URL, text, or media files</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full">
                2
              </div>
              <p className="font-medium">AI Analysis</p>
              <p className="text-muted-foreground">
                Cross-reference with trusted sources
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full">
                3
              </div>
              <p className="font-medium">Get Results</p>
              <p className="text-muted-foreground">Detailed accuracy report</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Submit Content for Analysis</CardTitle>
            <CardDescription>
              Choose how you'd like to submit your content for verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="url" className="flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  News URL
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Text Content
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Media Files
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="space-y-4">
                <div>
                  <Label htmlFor="url">News Article URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com/news-article"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, url: e.target.value }))
                    }
                    className="mt-1"
                  />
                  <p className="text-muted-foreground mt-1 text-sm">
                    Enter the full URL of the news article you want to verify
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label htmlFor="text">News Content</Label>
                  <Textarea
                    id="text"
                    placeholder="Paste the news content here..."
                    rows={8}
                    value={formData.text}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, text: e.target.value }))
                    }
                    className="mt-1"
                  />
                  <p className="text-muted-foreground mt-1 text-sm">
                    Copy and paste the full text content you want to verify
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-4">
                <div>
                  <Label htmlFor="files">Upload Media Files</Label>
                  <div className="mt-1">
                    <Input
                      id="files"
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Label
                      htmlFor="files"
                      className="border-muted-foreground/25 hover:bg-muted/50 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
                    >
                      <Upload className="text-muted-foreground mb-2 h-8 w-8" />
                      <span className="text-sm font-medium">
                        Click to upload files
                      </span>
                      <span className="text-muted-foreground text-xs">
                        Images, videos, screenshots
                      </span>
                    </Label>
                  </div>

                  {formData.files.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files:</Label>
                      {formData.files.map((file, index) => (
                        <div
                          key={index}
                          className="bg-muted flex items-center justify-between rounded-lg p-2"
                        >
                          <div className="flex items-center gap-2">
                            {getFileIcon(file)}
                            <span className="truncate text-sm">
                              {file.name}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {(file.size / 1024 / 1024).toFixed(1)} MB
                            </Badge>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-muted-foreground text-sm">
                    Upload images, videos, or screenshots containing news
                    content
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mb-8 flex justify-center">
          <Button
            type="submit"
            size="lg"
            disabled={
              isAnalyzing ||
              (!formData.url && !formData.text && formData.files.length === 0)
            }
            className="min-w-[200px]"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Analyze Content
              </>
            )}
          </Button>
        </div>
      </div>

      {isAnalyzing && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Analysis in Progress
            </CardTitle>
            <CardDescription>
              Please wait while we verify your content against trusted sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={analysisProgress} className="w-full" />
              <div className="text-muted-foreground text-center text-sm">
                {analysisProgress < 30 && "Extracting content..."}
                {analysisProgress >= 30 &&
                  analysisProgress < 60 &&
                  "Analyzing against truth sources..."}
                {analysisProgress >= 60 &&
                  analysisProgress < 90 &&
                  "Cross-referencing with verified sources..."}
                {analysisProgress >= 90 && "Finalizing results..."}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {results.status === "verified" ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              )}
              Analysis Results
            </CardTitle>
            <CardDescription>Content verification completed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge
                variant={
                  results.status === "verified" ? "default" : "secondary"
                }
                className="text-sm"
              >
                {results.status === "verified" ? "Verified" : "Needs Review"}
              </Badge>
              <span className="text-muted-foreground text-sm">
                Confidence: {results.confidence}%
              </span>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{results.summary}</AlertDescription>
            </Alert>

            <div>
              <Label className="text-sm font-medium">
                Verified by Sources:
              </Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {results.sources.map((source, index) => (
                  <Badge key={index} variant="outline">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Analysis Details:</Label>
              <p className="text-muted-foreground mt-1 text-sm">
                {results.details}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
