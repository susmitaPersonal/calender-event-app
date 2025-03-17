import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // If using ShadCN

const BarGraphModal = ({ open, onClose, data, selectedDate }) => {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle>Data for {selectedDate}</DialogTitle>
      <DialogContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="user" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data found for the selected date.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BarGraphModal;
