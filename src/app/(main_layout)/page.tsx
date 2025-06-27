// src/app/page.tsx
import Link from "next/link";
import {
  Shield,
  Search,
  CheckCircle,
  AlertTriangle,
  FileText,
  Image,
  Video,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-8 flex justify-center">
            <Shield className="text-primary h-20 w-20" />
          </div>
          <h1 className="text-foreground mb-6 text-4xl font-bold sm:text-6xl">
            Verify News with
            <span className="text-primary block">AI-Powered Truth</span>
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl">
            Combat misinformation with our advanced fact-checking platform.
            Analyze news articles, images, and videos against verified trusted
            sources to get instant credibility assessments.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold transition-colors"
            >
              <Search className="h-5 w-5" />
              Start Fact-Checking
            </Link>
            <Link
              href="/about"
              className="border-border text-foreground hover:bg-muted rounded-lg border px-8 py-4 text-lg font-semibold transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
              Comprehensive Content Analysis
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              Our platform supports multiple content types and provides detailed
              verification against trusted sources.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-card border-border rounded-lg border p-6 text-center">
              <FileText className="text-primary mx-auto mb-4 h-12 w-12" />
              <h3 className="text-card-foreground mb-2 text-xl font-semibold">
                News Articles
              </h3>
              <p className="text-muted-foreground">
                Paste URLs or full text content for comprehensive fact-checking
                analysis.
              </p>
            </div>

            <div className="bg-card border-border rounded-lg border p-6 text-center">
              <Image className="text-primary mx-auto mb-4 h-12 w-12" />
              <h3 className="text-card-foreground mb-2 text-xl font-semibold">
                Images & Screenshots
              </h3>
              <p className="text-muted-foreground">
                Upload images for OCR analysis and visual content verification.
              </p>
            </div>

            <div className="bg-card border-border rounded-lg border p-6 text-center">
              <Video className="text-primary mx-auto mb-4 h-12 w-12" />
              <h3 className="text-card-foreground mb-2 text-xl font-semibold">
                Video Content
              </h3>
              <p className="text-muted-foreground">
                Analyze TikTok, clips, and other video content with
                speech-to-text.
              </p>
            </div>

            <div className="bg-card border-border rounded-lg border p-6 text-center">
              <Zap className="text-primary mx-auto mb-4 h-12 w-12" />
              <h3 className="text-card-foreground mb-2 text-xl font-semibold">
                Real-time Analysis
              </h3>
              <p className="text-muted-foreground">
                Get instant results with AI-powered content extraction and
                verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
              How TruthCheck Works
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              Our four-step process ensures comprehensive and reliable
              fact-checking.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-foreground mb-2 text-xl font-semibold">
                Submit Content
              </h3>
              <p className="text-muted-foreground">
                Upload or paste your news content, images, or video links for
                analysis.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-foreground mb-2 text-xl font-semibold">
                Content Extraction
              </h3>
              <p className="text-muted-foreground">
                AI extracts text from images and videos using OCR and
                speech-to-text technology.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-foreground mb-2 text-xl font-semibold">
                Source Verification
              </h3>
              <p className="text-muted-foreground">
                Compare against admin-curated trusted sources for accuracy
                validation.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-primary text-2xl font-bold">4</span>
              </div>
              <h3 className="text-foreground mb-2 text-xl font-semibold">
                Get Results
              </h3>
              <p className="text-muted-foreground">
                Receive detailed analysis with highlighted differences and
                credibility score.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
              Verified by Trusted Sources
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              All verifications are backed by admin-curated trusted news
              organizations and fact-checking entities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-card border-border rounded-lg border p-8 text-center">
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
              <h3 className="text-card-foreground mb-2 text-2xl font-bold">
                Verified
              </h3>
              <p className="text-muted-foreground">
                Content matches trusted sources with high confidence score.
              </p>
            </div>

            <div className="bg-card border-border rounded-lg border p-8 text-center">
              <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-yellow-500" />
              <h3 className="text-card-foreground mb-2 text-2xl font-bold">
                Questionable
              </h3>
              <p className="text-muted-foreground">
                Partial matches found, requires further investigation and
                caution.
              </p>
            </div>

            <div className="bg-card border-border rounded-lg border p-8 text-center">
              <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-500" />
              <h3 className="text-card-foreground mb-2 text-2xl font-bold">
                Unverified
              </h3>
              <p className="text-muted-foreground">
                No matching trusted sources found, potentially misleading
                content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            Ready to Fight Misinformation?
          </h2>
          <p className="text-muted-foreground mb-8 text-xl">
            Join thousands of users who trust TruthCheck to verify their news
            content.
          </p>
          <Link
            href="/submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold transition-colors"
          >
            <Shield className="h-5 w-5" />
            Start Fact-Checking Now
          </Link>
        </div>
      </section>
    </div>
  );
}
