

export interface TokenPayload {
  userId: string;
  // Outros campos que possam existir no payload do token
}

export interface Task {
  _id: string;
  userId:string;
  id: string;
  title:string;
  description: string;
  completed:boolean;
}