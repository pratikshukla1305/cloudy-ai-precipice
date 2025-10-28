import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Droplets, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface ForecastData {
  humidity: number;
  pressure: number;
  cloudcover: number;
  precip: number;
  temperature: number;
}

interface ForecastSectionProps {
  data?: ForecastData;
  locationName: string;
  aiAnalysis?: string;
}

const ForecastSection = ({ data, locationName, aiAnalysis }: ForecastSectionProps) => {
  // If AI analysis is provided, display it instead of calculated risk
  if (aiAnalysis) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudRain className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">AI Cloudburst Analysis</CardTitle>
            </div>
          </div>
          <CardDescription>
            Real-time satellite image analysis powered by AI vision • {locationName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-foreground/90">
              {aiAnalysis}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Original calculated risk display
  if (!data) return null;
  // Calculate cloudburst risk based on multiple factors
  const calculateCloudburstRisk = () => {
    let riskScore = 0;
    let factors = [];

    // High humidity increases risk
    if (data.humidity > 85) {
      riskScore += 30;
      factors.push("High humidity (>85%)");
    } else if (data.humidity > 70) {
      riskScore += 15;
      factors.push("Moderate humidity");
    }

    // High cloud cover increases risk
    if (data.cloudcover > 80) {
      riskScore += 25;
      factors.push("Heavy cloud cover");
    } else if (data.cloudcover > 60) {
      riskScore += 10;
      factors.push("Moderate cloud cover");
    }

    // Low pressure indicates storms
    if (data.pressure < 1000) {
      riskScore += 30;
      factors.push("Low atmospheric pressure");
    } else if (data.pressure < 1010) {
      riskScore += 15;
      factors.push("Decreasing pressure");
    }

    // Active precipitation
    if (data.precip > 5) {
      riskScore += 15;
      factors.push("Active precipitation");
    } else if (data.precip > 0) {
      riskScore += 5;
      factors.push("Light precipitation");
    }

    return { riskScore: Math.min(riskScore, 100), factors };
  };

  const { riskScore, factors } = calculateCloudburstRisk();

  const getRiskLevel = () => {
    if (riskScore >= 70) return { level: "High", color: "destructive", icon: AlertTriangle };
    if (riskScore >= 40) return { level: "Moderate", color: "warning", icon: TrendingUp };
    return { level: "Low", color: "success", icon: TrendingDown };
  };

  const risk = getRiskLevel();
  const RiskIcon = risk.icon;

  const getPrediction = () => {
    if (riskScore >= 70) {
      return "High probability of severe weather conditions. Cloudburst likely within 2-6 hours. Immediate precautionary measures recommended.";
    } else if (riskScore >= 40) {
      return "Moderate risk of heavy rainfall. Monitor weather conditions closely. Prepare for potential cloudbursts within 6-12 hours.";
    }
    return "Low risk of cloudburst events. Weather conditions are stable. Continue normal monitoring.";
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Cloud className="h-6 w-6 text-primary" />
          AI Cloudburst Prediction for {locationName}
        </CardTitle>
        <CardDescription>
          Real-time analysis and risk assessment based on current atmospheric conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Score Display */}
        <div className="flex items-center justify-between p-6 rounded-lg bg-gradient-to-r from-background/50 to-background/30 border border-primary/20">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Cloudburst Risk Level</p>
            <div className="flex items-center gap-3">
              <Badge 
                variant={risk.color as any}
                className="text-lg px-4 py-2"
              >
                <RiskIcon className="h-5 w-5 mr-2" />
                {risk.level} Risk
              </Badge>
              <span className="text-3xl font-bold">{riskScore}%</span>
            </div>
          </div>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center border-4 border-primary/30">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{riskScore}</div>
              <div className="text-xs text-muted-foreground">Risk Score</div>
            </div>
          </div>
        </div>

        {/* AI Prediction */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            AI Prediction
          </h3>
          <p className="text-muted-foreground leading-relaxed bg-background/30 p-4 rounded-lg border border-primary/10">
            {getPrediction()}
          </p>
        </div>

        {/* Contributing Factors */}
        {factors.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              Contributing Risk Factors
            </h3>
            <div className="grid gap-2">
              {factors.map((factor, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/30 border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Recommended Actions</h3>
          <div className="space-y-2">
            {riskScore >= 70 && (
              <>
                <p className="text-sm text-muted-foreground">• Issue immediate weather alerts to affected areas</p>
                <p className="text-sm text-muted-foreground">• Evacuate low-lying and flood-prone zones</p>
                <p className="text-sm text-muted-foreground">• Activate emergency response teams</p>
                <p className="text-sm text-muted-foreground">• Monitor drainage systems and water levels</p>
              </>
            )}
            {riskScore >= 40 && riskScore < 70 && (
              <>
                <p className="text-sm text-muted-foreground">• Issue weather advisories to local authorities</p>
                <p className="text-sm text-muted-foreground">• Prepare emergency response systems</p>
                <p className="text-sm text-muted-foreground">• Monitor weather conditions continuously</p>
                <p className="text-sm text-muted-foreground">• Alert residents in vulnerable areas</p>
              </>
            )}
            {riskScore < 40 && (
              <>
                <p className="text-sm text-muted-foreground">• Continue routine weather monitoring</p>
                <p className="text-sm text-muted-foreground">• Maintain readiness protocols</p>
                <p className="text-sm text-muted-foreground">• Update forecasts every 3-6 hours</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastSection;
