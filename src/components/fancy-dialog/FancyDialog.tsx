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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Component() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
          Open Quality Testing Dialog
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
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
          <div className="space-y-4">
            <div>
              <Label htmlFor="system-of-record">System of Record</Label>
              <Input id="system-of-record" value="PCO" />
            </div>
            <div>
              <Label htmlFor="org">Org</Label>
              <Input id="org" value="333" />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input id="type" value="555" />
            </div>
            <div>
              <Label htmlFor="text4">Text4</Label>
              <Input id="text4" value="Thiscouldbesomethinglong" />
            </div>
            <div>
              <Label htmlFor="text5">Text5</Label>
              <Input id="text5" value="x" />
            </div>
          </div>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
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
                <div key={index} className="flex items-center justify-between">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
