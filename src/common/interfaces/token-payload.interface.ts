export interface TokenPayload {
  userId: string;
  email: string;
  type: string;
  restaurantId: string | null;
  permissions: Record<string, boolean>;
}
