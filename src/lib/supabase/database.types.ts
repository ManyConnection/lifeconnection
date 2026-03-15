export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          name: string;
          key: string;
          description: string;
          color: string;
          owner_id: string;
          status_config: Json | null;
          priority_config: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          key: string;
          description?: string;
          color?: string;
          owner_id: string;
          status_config?: Json | null;
          priority_config?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          key?: string;
          description?: string;
          color?: string;
          owner_id?: string;
          status_config?: Json | null;
          priority_config?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      project_members: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          role: "admin" | "member" | "viewer";
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id: string;
          role?: "admin" | "member" | "viewer";
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          user_id?: string;
          role?: "admin" | "member" | "viewer";
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      labels: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          color?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          color?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "labels_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      tasks: {
        Row: {
          id: string;
          project_id: string;
          task_number: number;
          title: string;
          description: string;
          status: "open" | "in_progress" | "in_review" | "done" | "closed";
          priority: "low" | "medium" | "high" | "critical";
          assignee_id: string | null;
          parent_task_id: string | null;
          start_date: string | null;
          due_date: string | null;
          sort_order: number;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          task_number?: number;
          title: string;
          description?: string;
          status?: "open" | "in_progress" | "in_review" | "done" | "closed";
          priority?: "low" | "medium" | "high" | "critical";
          assignee_id?: string | null;
          parent_task_id?: string | null;
          start_date?: string | null;
          due_date?: string | null;
          sort_order?: number;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          task_number?: number;
          title?: string;
          description?: string;
          status?: "open" | "in_progress" | "in_review" | "done" | "closed";
          priority?: "low" | "medium" | "high" | "critical";
          assignee_id?: string | null;
          parent_task_id?: string | null;
          start_date?: string | null;
          due_date?: string | null;
          sort_order?: number;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_assignee_id_fkey";
            columns: ["assignee_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_parent_task_id_fkey";
            columns: ["parent_task_id"];
            isOneToOne: false;
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      task_labels: {
        Row: {
          task_id: string;
          label_id: string;
        };
        Insert: {
          task_id: string;
          label_id: string;
        };
        Update: {
          task_id?: string;
          label_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "task_labels_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "task_labels_label_id_fkey";
            columns: ["label_id"];
            isOneToOne: false;
            referencedRelation: "labels";
            referencedColumns: ["id"];
          },
        ];
      };
      task_dependencies: {
        Row: {
          id: string;
          predecessor_id: string;
          successor_id: string;
          dependency_type:
            | "finish_to_start"
            | "start_to_start"
            | "finish_to_finish"
            | "start_to_finish";
          created_at: string;
        };
        Insert: {
          id?: string;
          predecessor_id: string;
          successor_id: string;
          dependency_type?:
            | "finish_to_start"
            | "start_to_start"
            | "finish_to_finish"
            | "start_to_finish";
          created_at?: string;
        };
        Update: {
          id?: string;
          predecessor_id?: string;
          successor_id?: string;
          dependency_type?:
            | "finish_to_start"
            | "start_to_start"
            | "finish_to_finish"
            | "start_to_finish";
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "task_dependencies_predecessor_id_fkey";
            columns: ["predecessor_id"];
            isOneToOne: false;
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "task_dependencies_successor_id_fkey";
            columns: ["successor_id"];
            isOneToOne: false;
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
        ];
      };
      task_comments: {
        Row: {
          id: string;
          task_id: string;
          user_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          task_id: string;
          user_id: string;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          task_id?: string;
          user_id?: string;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "task_comments_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "task_comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      project_role: "admin" | "member" | "viewer";
      task_status: "open" | "in_progress" | "in_review" | "done" | "closed";
      task_priority: "low" | "medium" | "high" | "critical";
      dependency_type:
        | "finish_to_start"
        | "start_to_start"
        | "finish_to_finish"
        | "start_to_finish";
    };
  };
};
