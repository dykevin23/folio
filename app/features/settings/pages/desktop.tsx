import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";
import { Plus, ChevronLeft, Pencil, Trash2 } from "lucide-react";
import type { loader } from "../queries";

type Region = {
  id: string;
  parentId: string | null;
  name: string;
};

export default function DesktopSettings() {
  const { regions } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const [selectedParent, setSelectedParent] = useState<Region | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Region | null>(null);
  const [name, setName] = useState("");

  const roots = regions.filter((r: Region) => !r.parentId);
  const children = selectedParent
    ? regions.filter((r: Region) => r.parentId === selectedParent.id)
    : [];

  const isEdit = !!editTarget;

  function openCreate() {
    setEditTarget(null);
    setName("");
    setDialogOpen(true);
  }

  function openEdit(region: Region) {
    setEditTarget(region);
    setName(region.name);
    setDialogOpen(true);
  }

  function handleDelete(region: Region) {
    const hasChildren = regions.some((r: Region) => r.parentId === region.id);
    if (hasChildren) {
      alert("하위 행정구역이 있어 삭제할 수 없습니다.");
      return;
    }
    if (!confirm(`"${region.name}"을(를) 삭제하시겠습니까?`)) return;
    fetcher.submit({ intent: "delete", id: region.id }, { method: "post" });
  }

  function handleSubmit() {
    if (!name.trim()) return;

    if (isEdit) {
      fetcher.submit(
        { intent: "update", id: editTarget!.id, name: name.trim() },
        { method: "post" }
      );
    } else {
      fetcher.submit(
        {
          intent: "create",
          name: name.trim(),
          parentId: selectedParent?.id ?? "",
        },
        { method: "post" }
      );
    }
    setDialogOpen(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">설정</h1>

      <section className="mt-6">
        <div className="flex items-center justify-between">
          <div>
            {selectedParent ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setSelectedParent(null)}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <div>
                  <h2 className="text-lg font-semibold">
                    {selectedParent.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    하위 시/군/구를 등록합니다.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold">행정구역 관리</h2>
                <p className="text-sm text-muted-foreground">
                  시/도를 등록하고, 클릭하여 하위 시/군/구를 관리합니다.
                </p>
              </div>
            )}
          </div>
          <Button onClick={openCreate} size="sm">
            <Plus className="size-4" />
            {selectedParent ? "시/군/구 추가" : "시/도 추가"}
          </Button>
        </div>

        <div className="mt-4 rounded-lg border">
          {selectedParent ? (
            children.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                등록된 시/군/구가 없습니다.
              </p>
            ) : (
              children.map((region: Region) => (
                <div
                  key={region.id}
                  className="group flex items-center border-b px-4 py-2.5 last:border-b-0"
                >
                  <span className="flex-1 text-sm">{region.name}</span>
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => openEdit(region)}
                    >
                      <Pencil className="size-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleDelete(region)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </div>
              ))
            )
          ) : roots.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              등록된 행정구역이 없습니다. 시/도를 추가해주세요.
            </p>
          ) : (
            roots.map((region: Region) => (
              <div
                key={region.id}
                className="group flex cursor-pointer items-center border-b px-4 py-2.5 last:border-b-0 hover:bg-muted"
                onClick={() => setSelectedParent(region)}
              >
                <span className="flex-1 text-sm font-medium">
                  {region.name}
                </span>
                <span className="mr-2 text-xs text-muted-foreground">
                  {regions.filter((r: Region) => r.parentId === region.id).length}개
                </span>
                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEdit(region);
                    }}
                  >
                    <Pencil className="size-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(region);
                    }}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEdit
                ? "행정구역 수정"
                : selectedParent
                  ? `${selectedParent.name} — 시/군/구 추가`
                  : "시/도 추가"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 pt-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder={
                selectedParent
                  ? "예: 동대문구, 안양시"
                  : "예: 서울특별시, 경기도"
              }
              autoFocus
            />
            <Button onClick={handleSubmit} disabled={!name.trim()}>
              {isEdit ? "수정" : "추가"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
