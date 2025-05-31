
import { useState, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  avatar_url?: string;
}

interface WorkspaceSelectorProps {
  onWorkspaceChange: (workspace: Workspace) => void;
}

export const WorkspaceSelector: React.FC<WorkspaceSelectorProps> = ({ onWorkspaceChange }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (user) {
      fetchWorkspaces();
    }
  }, [user]);

  const fetchWorkspaces = async () => {
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setWorkspaces(data || []);
      
      // Select the first workspace if none is selected
      if (data && data.length > 0 && !currentWorkspace) {
        const firstWorkspace = data[0];
        setCurrentWorkspace(firstWorkspace);
        onWorkspaceChange(firstWorkspace);
      }
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      toast({
        title: 'Error',
        description: 'Failed to load workspaces',
        variant: 'destructive',
      });
    }
  };

  const createWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = newWorkspace.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      const { data: workspace, error: workspaceError } = await supabase
        .from('workspaces')
        .insert({
          name: newWorkspace.name,
          slug,
          description: newWorkspace.description,
          owner_id: user?.id,
        })
        .select()
        .single();

      if (workspaceError) throw workspaceError;

      // Add the user as a member with owner role
      const { error: memberError } = await supabase
        .from('workspace_members')
        .insert({
          workspace_id: workspace.id,
          user_id: user?.id,
          role: 'owner',
        });

      if (memberError) throw memberError;

      setWorkspaces([workspace, ...workspaces]);
      setCurrentWorkspace(workspace);
      onWorkspaceChange(workspace);
      setIsModalOpen(false);
      setNewWorkspace({ name: '', description: '' });

      toast({
        title: 'Workspace created!',
        description: `${workspace.name} has been created successfully.`,
      });
    } catch (error: any) {
      console.error('Error creating workspace:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create workspace',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const switchWorkspace = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    onWorkspaceChange(workspace);
  };

  return (
    <div className="p-4 border-b border-purple-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => console.log('Workspace selector clicked')}>
          <h1 className="text-lg font-bold text-white">{currentWorkspace?.name || 'Select Workspace'}</h1>
          <ChevronDown className="w-4 h-4 text-purple-300" />
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="bg-purple-700 border-purple-600 text-white hover:bg-purple-600">
              <Plus className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workspace</DialogTitle>
            </DialogHeader>
            <form onSubmit={createWorkspace} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <Input
                  id="workspace-name"
                  value={newWorkspace.name}
                  onChange={(e) => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
                  placeholder="My Awesome Team"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workspace-description">Description (Optional)</Label>
                <Input
                  id="workspace-description"
                  value={newWorkspace.description}
                  onChange={(e) => setNewWorkspace({ ...newWorkspace, description: e.target.value })}
                  placeholder="What's this workspace for?"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Workspace'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
