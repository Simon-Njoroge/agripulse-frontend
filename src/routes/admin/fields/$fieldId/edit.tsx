import { createFileRoute, useParams } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { fieldService } from '@/api/field.service';
import { FieldForm } from '@/components/FieldForm';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/admin/fields/$fieldId/edit')({
  component: EditField,
});

function EditField() {
  const { fieldId } = useParams({ from: '/admin/fields/$fieldId/edit' });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [field, setField] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(false);
  }, [fieldId]);

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return fieldService.updateField(fieldId, data);
    },
    onSuccess: () => {
      toast.success('Field updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      navigate({ to: '/admin/fields' });
    },
    onError: () => {
      toast.error('Failed to update field');
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <FieldForm
        defaultValues={field}
        onSubmit={(data) => updateMutation.mutateAsync(data)}
        isLoading={updateMutation.isPending}
        title="Edit Field"
        submitText="Update Field"
      />
    </div>
  );
}
