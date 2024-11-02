"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Medal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LeaderBoardTable({ data }: { data: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="rounded-lg border border-border overflow-hidden animate-fade-in-right animate-delay-400 animate-duration-900">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
                  Posición
                </th>
                <th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
                  Usuario
                </th>
                <th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
                  <div className="flex items-center gap-2">
                    CPM promedio
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
                  Precisión promedio
                </th>
                <th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
                  Carreras jugadas
                </th>
                <th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
                  Lenguajes principales
                </th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {paginatedData.map((entry, index) => (
                  <motion.tr
                    key={entry.rank}
                    className="border-b border-border bg-card/50 hover:bg-card/80 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {entry.rank <= 3 ? (
                          <Medal
                            className={`h-5 w-5 ${
                              entry.rank === 1
                                ? "text-yellow-500"
                                : entry.rank === 2
                                ? "text-gray-400"
                                : "text-amber-700"
                            }`}
                          />
                        ) : (
                          <span className="text-muted-foreground">
                            {entry.rank}º
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={entry.user.image}
                            alt={entry.user.name}
                          />
                          <AvatarFallback>
                            {entry.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{entry.user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {entry.averageCpm.toLocaleString("es-ES", {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-green-500">{entry.accuracy}%</span>
                    </td>
                    <td className="px-4 py-3">{entry.racesPlayed}</td>
                    <td className="px-4 py-3">
                      {entry.languages.length > 0
                        ? entry.languages.join(", ")
                        : "---"}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        <div className="border-t border-border p-4 bg-card flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Filas por página
            </span>
            <Select
              defaultValue={rowsPerPage.toString()}
              onValueChange={handleRowsPerPageChange}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronFirst className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronLast className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground animate-fade-in-right animate-delay-400 animate-duration-900">
        Debes haber completado 5 carreras para aparecer en el ranking.
      </p>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}