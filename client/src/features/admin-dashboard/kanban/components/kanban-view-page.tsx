import DashboardPageContainer from '@/components/layout/DashboardPageContainer';
import { Heading } from '@/components/ui/heading';
import { KanbanBoard } from './kanban-board';
import NewTaskDialog from './new-task-dialog';

export default function KanbanViewPage() {
  return (
    <DashboardPageContainer>
      <div className='space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title={`Kanban`} description='Manage tasks by dnd' />
          <NewTaskDialog />
        </div>
        <KanbanBoard />
      </div>
    </DashboardPageContainer>
  );
}
