"use client";

import React, { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { ErrorBoundaryProps } from "@/types";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * React Error Boundary component for catching and handling component errors
 * Provides a fallback UI when errors occur in the component tree
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 bg-destructive/10 rounded-lg border border-destructive/20">
          <h3 className="text-lg font-semibold mb-2 text-destructive">
            Something went wrong
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <Button onClick={this.handleReset} variant="outline" size="sm">
            Try again
          </Button>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-4">
              <summary className="text-xs text-muted-foreground cursor-pointer">
                Error details
              </summary>
              <pre className="mt-2 text-xs overflow-auto p-2 bg-background rounded">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
