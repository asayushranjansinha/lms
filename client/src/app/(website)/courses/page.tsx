import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CoursesDataFetcher } from '@/components/website/course-list-page/CourseDataFetcher';


export default function CoursesPage() {
  return (
    <ScrollArea className='bg-background text-foreground h-screen'>
      <div className='flex min-h-screen flex-col'>
        <Header />

        <main className='container mx-auto flex-1 px-4 py-12 md:px-6'>
          <CoursesDataFetcher />
        </main>

        <Footer />
      </div> 
    </ScrollArea>
  );
}
