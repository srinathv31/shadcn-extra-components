import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SendIcon, PaperclipIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Component() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
          Open Quality Testing Dialog
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Quality Testing Application - Sample Detail</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
          <div>
            <Label className="text-muted-foreground">ID</Label>
            <p className="font-medium">100123090101</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Application Number</Label>
            <p className="font-medium">20022233346692</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Name</Label>
            <p className="font-medium">John Smith1</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Reviewer</Label>
            <p className="font-medium">Heimer, A</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Review Date</Label>
            <p className="font-medium">3/31/23</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Conclusion</Label>
            <Select defaultValue="pass">
              <SelectTrigger id="conclusion">
                <SelectValue placeholder="Select conclusion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pass">Pass</SelectItem>
                <SelectItem value="fail">Fail</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-muted-foreground">Status</Label>
            <Select defaultValue="complete">
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="not-complete">Not Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Tabs defaultValue="flex-fields" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="flex-fields">Flex Fields</TabsTrigger>
              <TabsTrigger value="dispute-1">Dispute 1</TabsTrigger>
              <TabsTrigger value="dispute-2">Dispute 2</TabsTrigger>
              <TabsTrigger value="final">Final</TabsTrigger>
            </TabsList>
            <TabsContent value="flex-fields">
              <h3 className="text-lg font-semibold mb-4">Flex Fields</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">
                    System of Record
                  </Label>
                  <p className="font-medium">PCO</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Org</Label>
                  <p className="font-medium">333</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Type</Label>
                  <p className="font-medium">555</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Text4</Label>
                  <p className="font-medium">Thiscouldbesomethinglong</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Text5</Label>
                  <p className="font-medium">x</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="dispute-1">
              <h3 className="text-lg font-semibold mb-4">Dispute 1</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Enter dispute 1 details..."
                    className="min-h-[80px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                    <Button type="submit" size="icon" variant="ghost">
                      <SendIcon className="h-4 w-4" />
                      <span className="sr-only">Submit dispute 1</span>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="dispute-2">
              <h3 className="text-lg font-semibold mb-4">Dispute 2</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Enter dispute 2 details..."
                    className="min-h-[80px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                    <Button type="submit" size="icon" variant="ghost">
                      <SendIcon className="h-4 w-4" />
                      <span className="sr-only">Submit dispute 2</span>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="final">
              <h3 className="text-lg font-semibold mb-4">Final</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Enter final details..."
                    className="min-h-[80px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                    <Button type="submit" size="icon" variant="ghost">
                      <SendIcon className="h-4 w-4" />
                      <span className="sr-only">Submit final</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <PaperclipIcon className="h-4 w-4" />
                  <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                    Drop or select file
                  </span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Test Questions</h3>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="space-y-4">
                {[
                  "Verify BO Team confirmed age in System of Record",
                  "Verify Follow Up Letter was sent if application is between 60-65 days old",
                  "Verify application info was logged in SP, if applicable",
                  "Verify issuance of appropriate SSOD Letter",
                  "Verify accuracy of info within letter: Customer Name",
                  "Verify accuracy of info within letter: Address",
                  "Ques7",
                ].map((question, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{question}</span>
                    <Select>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pass">Pass</SelectItem>
                        <SelectItem value="fail">Fail</SelectItem>
                        <SelectItem value="na">N/A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="relative">
              <Textarea
                placeholder="Enter your comment here..."
                className="min-h-[80px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                <Button type="submit" size="icon" variant="ghost">
                  <SendIcon className="h-4 w-4" />
                  <span className="sr-only">Send comment</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
