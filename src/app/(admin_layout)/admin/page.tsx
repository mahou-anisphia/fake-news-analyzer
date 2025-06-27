// src/app/admin/truth-sources/page.tsx
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
import { Badge } from "~/components/ui/badge";

import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Shield,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Settings,
  Database,
  TrendingUp,
  X,
} from "lucide-react";

type SourceCategory = "news" | "fact-check" | "academic" | "government";

interface TruthSource {
  id: number;
  name: string;
  url: string;
  category: SourceCategory;
  reliability: number;
  isActive: boolean;
  apiKey: string | null;
  lastUpdated: string;
  totalValidations: number;
  successRate: number;
  description: string;
}

interface NewSourceData {
  name: string;
  url: string;
  category: SourceCategory;
  reliability: number;
  apiKey: string;
  description: string;
}

export default function AdminTruthSourcesPage() {
  const [sources, setSources] = useState<TruthSource[]>([
    {
      id: 1,
      name: "Reuters",
      url: "https://reuters.com",
      category: "news",
      reliability: 95,
      isActive: true,
      apiKey: "reuters_api_key_***",
      lastUpdated: "2024-06-27T10:30:00Z",
      totalValidations: 1247,
      successRate: 92.5,
      description:
        "International news organization providing fact-based journalism",
    },
    {
      id: 2,
      name: "AP News",
      url: "https://apnews.com",
      category: "news",
      reliability: 93,
      isActive: true,
      apiKey: "ap_api_key_***",
      lastUpdated: "2024-06-27T09:15:00Z",
      totalValidations: 892,
      successRate: 89.2,
      description: "American news agency with global coverage",
    },
    {
      id: 3,
      name: "Snopes",
      url: "https://snopes.com",
      category: "fact-check",
      reliability: 88,
      isActive: true,
      apiKey: null,
      lastUpdated: "2024-06-27T08:45:00Z",
      totalValidations: 634,
      successRate: 91.8,
      description:
        "Fact-checking website specializing in debunking misinformation",
    },
    {
      id: 4,
      name: "PolitiFact",
      url: "https://politifact.com",
      category: "fact-check",
      reliability: 85,
      isActive: false,
      apiKey: null,
      lastUpdated: "2024-06-26T16:20:00Z",
      totalValidations: 423,
      successRate: 87.4,
      description: "Political fact-checking service",
    },
  ]);

  const [isAddingSource, setIsAddingSource] = useState(false);
  const [editingSource, setEditingSource] = useState<TruthSource | null>(null);
  const [viewingSource, setViewingSource] = useState<TruthSource | null>(null);
  const [newSource, setNewSource] = useState<NewSourceData>({
    name: "",
    url: "",
    category: "news",
    reliability: 80,
    apiKey: "",
    description: "",
  });

  const handleAddSource = () => {
    if (newSource.name && newSource.url) {
      const source: TruthSource = {
        id: Date.now(),
        ...newSource,
        apiKey: newSource.apiKey || null,
        isActive: true,
        lastUpdated: new Date().toISOString(),
        totalValidations: 0,
        successRate: 0,
      };
      setSources([...sources, source]);
      setNewSource({
        name: "",
        url: "",
        category: "news",
        reliability: 80,
        apiKey: "",
        description: "",
      });
      setIsAddingSource(false);
    }
  };

  const handleEditSource = () => {
    if (editingSource) {
      setSources(
        sources.map((source) =>
          source.id === editingSource.id ? editingSource : source,
        ),
      );
      setEditingSource(null);
    }
  };

  const handleToggleSource = (id: number) => {
    setSources(
      sources.map((source) =>
        source.id === id ? { ...source, isActive: !source.isActive } : source,
      ),
    );
  };

  const handleDeleteSource = (id: number) => {
    setSources(sources.filter((source) => source.id !== id));
  };

  const getCategoryColor = (category: SourceCategory): string => {
    switch (category) {
      case "news":
        return "bg-blue-100 text-blue-800";
      case "fact-check":
        return "bg-green-100 text-green-800";
      case "academic":
        return "bg-purple-100 text-purple-800";
      case "government":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getReliabilityColor = (reliability: number): string => {
    if (reliability >= 90) return "text-green-600";
    if (reliability >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryDisplayName = (category: SourceCategory): string => {
    switch (category) {
      case "news":
        return "News Organization";
      case "fact-check":
        return "Fact-Checking Service";
      case "academic":
        return "Academic Institution";
      case "government":
        return "Government Source";
      default:
        return category;
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            Truth Sources Management
          </h1>
          <p className="text-muted-foreground">
            Manage and configure trusted sources for content verification
          </p>
        </div>
        <Button
          onClick={() => setIsAddingSource(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Source
        </Button>
      </div>

      {/* Statistics Overview */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Sources</p>
                <p className="text-2xl font-bold">{sources.length}</p>
              </div>
              <Database className="text-primary h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Sources</p>
                <p className="text-2xl font-bold text-green-600">
                  {sources.filter((s) => s.isActive).length}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Avg Reliability</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    sources.reduce((acc, s) => acc + s.reliability, 0) /
                      sources.length,
                  )}
                  %
                </p>
              </div>
              <Shield className="text-primary h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  Total Validations
                </p>
                <p className="text-2xl font-bold">
                  {sources
                    .reduce((acc, s) => acc + s.totalValidations, 0)
                    .toLocaleString()}
                </p>
              </div>
              <TrendingUp className="text-primary h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Source Form */}
      {isAddingSource && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Truth Source</CardTitle>
            <CardDescription>
              Configure a new trusted source for content verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Source Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., BBC News"
                  value={newSource.name}
                  onChange={(e) =>
                    setNewSource({ ...newSource, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="url">Source URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={newSource.url}
                  onChange={(e) =>
                    setNewSource({ ...newSource, url: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newSource.category}
                  onValueChange={(value: SourceCategory) =>
                    setNewSource({ ...newSource, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="news">News Organization</SelectItem>
                    <SelectItem value="fact-check">
                      Fact-Checking Service
                    </SelectItem>
                    <SelectItem value="academic">
                      Academic Institution
                    </SelectItem>
                    <SelectItem value="government">
                      Government Source
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reliability">Reliability Score (%)</Label>
                <Input
                  id="reliability"
                  type="number"
                  min="0"
                  max="100"
                  value={newSource.reliability}
                  onChange={(e) =>
                    setNewSource({
                      ...newSource,
                      reliability: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="apiKey">API Key (Optional)</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter API key if available"
                value={newSource.apiKey}
                onChange={(e) =>
                  setNewSource({ ...newSource, apiKey: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the source and its specialization"
                value={newSource.description}
                onChange={(e) =>
                  setNewSource({ ...newSource, description: e.target.value })
                }
              />
            </div>

            <div className="flex gap-4">
              <Button onClick={handleAddSource}>Add Source</Button>
              <Button
                variant="outline"
                onClick={() => setIsAddingSource(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sources List */}
      <div className="space-y-4">
        {sources.map((source) => (
          <Card
            key={source.id}
            className={`${!source.isActive ? "opacity-60" : ""}`}
          >
            <CardContent className="p-6">
              <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
                {/* Basic Info */}
                <div className="lg:col-span-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold">
                        {source.name}
                        {source.isActive ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        )}
                      </h3>
                      <p className="text-muted-foreground flex items-center gap-1 text-sm">
                        <Globe className="h-3 w-3" />
                        {source.url}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3 text-sm">
                    {source.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getCategoryColor(source.category)}>
                      {getCategoryDisplayName(source.category)}
                    </Badge>
                    <Badge variant="outline">
                      API: {source.apiKey ? "Configured" : "None"}
                    </Badge>
                  </div>
                </div>

                {/* Metrics */}
                <div className="lg:col-span-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-xs">
                        Reliability
                      </Label>
                      <p
                        className={`text-lg font-semibold ${getReliabilityColor(source.reliability)}`}
                      >
                        {source.reliability}%
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">
                        Success Rate
                      </Label>
                      <p className="text-lg font-semibold">
                        {source.successRate}%
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">
                        Total Validations
                      </Label>
                      <p className="text-lg font-semibold">
                        {source.totalValidations.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">
                        Last Updated
                      </Label>
                      <p className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {formatDate(source.lastUpdated)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 lg:col-span-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Active Status</Label>
                    <Switch
                      checked={source.isActive}
                      onCheckedChange={() => handleToggleSource(source.id)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingSource(source)}
                      className="flex-1"
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setViewingSource(source)}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteSource(source.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Source Dialog */}
      <Dialog
        open={!!editingSource}
        onOpenChange={(open) => !open && setEditingSource(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Truth Source</DialogTitle>
            <DialogDescription>
              Update the configuration for this truth source
            </DialogDescription>
          </DialogHeader>
          {editingSource && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="edit-name">Source Name</Label>
                  <Input
                    id="edit-name"
                    value={editingSource.name}
                    onChange={(e) =>
                      setEditingSource({
                        ...editingSource,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-url">Source URL</Label>
                  <Input
                    id="edit-url"
                    type="url"
                    value={editingSource.url}
                    onChange={(e) =>
                      setEditingSource({
                        ...editingSource,
                        url: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={editingSource.category}
                    onValueChange={(value: SourceCategory) =>
                      setEditingSource({ ...editingSource, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="news">News Organization</SelectItem>
                      <SelectItem value="fact-check">
                        Fact-Checking Service
                      </SelectItem>
                      <SelectItem value="academic">
                        Academic Institution
                      </SelectItem>
                      <SelectItem value="government">
                        Government Source
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-reliability">
                    Reliability Score (%)
                  </Label>
                  <Input
                    id="edit-reliability"
                    type="number"
                    min="0"
                    max="100"
                    value={editingSource.reliability}
                    onChange={(e) =>
                      setEditingSource({
                        ...editingSource,
                        reliability: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-apiKey">API Key</Label>
                <Input
                  id="edit-apiKey"
                  type="password"
                  value={editingSource.apiKey || ""}
                  onChange={(e) =>
                    setEditingSource({
                      ...editingSource,
                      apiKey: e.target.value || null,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingSource.description}
                  onChange={(e) =>
                    setEditingSource({
                      ...editingSource,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={handleEditSource}>Save Changes</Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingSource(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Source Details Dialog */}
      <Dialog
        open={!!viewingSource}
        onOpenChange={(open) => !open && setViewingSource(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {viewingSource?.name}
              {viewingSource?.isActive ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              )}
            </DialogTitle>
            <DialogDescription>
              Detailed information about this truth source
            </DialogDescription>
          </DialogHeader>
          {viewingSource && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Source URL</Label>
                    <p className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Globe className="h-3 w-3" />
                      <a
                        href={viewingSource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {viewingSource.url}
                      </a>
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Category</Label>
                    <div className="mt-1">
                      <Badge
                        className={getCategoryColor(viewingSource.category)}
                      >
                        {getCategoryDisplayName(viewingSource.category)}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-muted-foreground text-sm">
                      {viewingSource.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Reliability Score
                      </Label>
                      <p
                        className={`text-2xl font-bold ${getReliabilityColor(viewingSource.reliability)}`}
                      >
                        {viewingSource.reliability}%
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Success Rate
                      </Label>
                      <p className="text-2xl font-bold">
                        {viewingSource.successRate}%
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Total Validations
                    </Label>
                    <p className="text-2xl font-bold">
                      {viewingSource.totalValidations.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      API Configuration
                    </Label>
                    <Badge variant="outline">
                      {viewingSource.apiKey
                        ? "API Key Configured"
                        : "No API Key"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium">Last Updated</Label>
                <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                  <Clock className="h-3 w-3" />
                  {formatDate(viewingSource.lastUpdated)}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
