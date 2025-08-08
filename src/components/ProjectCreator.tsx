import * as React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Users,
  Tag as TagIcon,
  Link2,
  Flag,
  ListTodo,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = [
  { label: "Backlog" },
  { label: "Planned" },
  { label: "In Progress" },
  { label: "Completed" },
  { label: "Canceled" },
];

const PRIORITY_OPTIONS = [
  { label: "No priority" },
  { label: "Urgent" },
  { label: "High" },
  { label: "Medium" },
  { label: "Low" },
];

function ChipTrigger({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <Button
      variant="secondary"
      size="sm"
      className="rounded-full h-8 px-3 gap-2 border"
    >
      {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
      <span className="text-sm leading-none">{children}</span>
      <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
    </Button>
  );
}

export default function ProjectCreator() {
  const [open, setOpen] = React.useState(false);

  const [status, setStatus] = React.useState(STATUS_OPTIONS[0].label);
  const [priority, setPriority] = React.useState(PRIORITY_OPTIONS[0].label);
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [targetDate, setTargetDate] = React.useState<Date | undefined>();

  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");

  // Milestone state
  const [msTitle, setMsTitle] = React.useState("");
  const [msDesc, setMsDesc] = React.useState("");
  const [msDate, setMsDate] = React.useState<Date | undefined>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="shadow-sm">
          New project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl">New project</DialogTitle>
          <DialogDescription className="sr-only">
            Create a new project, set schedule, labels, and milestones
          </DialogDescription>
        </DialogHeader>

        {/* Toolbar chips */}
        <div className="px-6 flex flex-wrap gap-2">
          {/* Status */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span>
                <ChipTrigger icon={ListTodo}>{status}</ChipTrigger>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              <DropdownMenuLabel>Change status…</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {STATUS_OPTIONS.map((opt) => (
                <DropdownMenuItem key={opt.label} onClick={() => setStatus(opt.label)}>
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Priority */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span>
                <ChipTrigger icon={Flag}>{priority}</ChipTrigger>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuLabel>Change priority…</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {PRIORITY_OPTIONS.map((opt) => (
                <DropdownMenuItem key={opt.label} onClick={() => setPriority(opt.label)}>
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Members */}
          <Popover>
            <PopoverTrigger asChild>
              <span>
                <ChipTrigger icon={Users}>Members</ChipTrigger>
              </span>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64">
              <p className="text-sm text-muted-foreground">Team picker placeholder</p>
            </PopoverContent>
          </Popover>

          {/* Start date */}
          <Popover>
            <PopoverTrigger asChild>
              <span>
                <ChipTrigger icon={CalendarIcon}>
                  {startDate ? `Start ${format(startDate, "MMM d, yyyy")}` : "Start"}
                </ChipTrigger>
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

          {/* Target date */}
          <Popover>
            <PopoverTrigger asChild>
              <span>
                <ChipTrigger icon={CalendarIcon}>
                  {targetDate ? `Target ${format(targetDate, "MMM d, yyyy")}` : "Target"}
                </ChipTrigger>
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={targetDate}
                onSelect={setTargetDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

          {/* Labels */}
          <Popover>
            <PopoverTrigger asChild>
              <span>
                <ChipTrigger icon={TagIcon}>Labels</ChipTrigger>
              </span>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64">
              <div className="text-sm text-muted-foreground">Add or select labels</div>
              <div className="mt-2 flex gap-2 flex-wrap">
                <Badge variant="secondary">Design</Badge>
                <Badge variant="secondary">Frontend</Badge>
                <Badge variant="secondary">Backend</Badge>
              </div>
            </PopoverContent>
          </Popover>

          {/* Dependencies */}
          <Popover>
            <PopoverTrigger asChild>
              <span>
                <ChipTrigger icon={Link2}>Dependencies</ChipTrigger>
              </span>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72">
              <p className="text-sm text-muted-foreground">Link related projects or tasks</p>
            </PopoverContent>
          </Popover>
        </div>

        <Separator className="my-4" />

        {/* Body */}
        <div className="px-6 pb-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input
              id="project-name"
              placeholder="Add project name…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-desc">Description</Label>
            <Textarea
              id="project-desc"
              placeholder="Write a description, a project brief, or collect ideas…"
              className="min-h-[9rem]"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          {/* Milestones */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ListTodo className="h-4 w-4" />
                <h3 className="text-sm font-medium">Milestones</h3>
              </div>
              <Button variant="secondary" size="sm">Add milestone</Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ms-title">Milestone name</Label>
                <Input
                  id="ms-title"
                  placeholder="Add a description…"
                  value={msTitle}
                  onChange={(e) => setMsTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ms-date">Target date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="ms-date"
                      variant="outline"
                      className={cn(
                        "justify-start font-normal",
                        !msDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {msDate ? format(msDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={msDate}
                      onSelect={setMsDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="ms-desc">Details</Label>
                <Textarea
                  id="ms-desc"
                  placeholder="Add notes…"
                  value={msDesc}
                  onChange={(e) => setMsDesc(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Fake submit
              setOpen(false);
            }}
          >
            Create project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
