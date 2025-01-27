export function handleError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'details' in error) {
    return (error as { details: string }).details;
  }

  return 'An unexpected error occurred.';
}
