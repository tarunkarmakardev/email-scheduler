import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Badge } from "../badge";
import { cn } from "@email-scheduler/utils";

export type MultiSelectOption = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: MultiSelectOption[];
  value: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  containerClassName?: string;
  onAddOption?: (option: string) => void;
};

export function MultiSelect({
  options: optionsProp,
  value,
  onChange,
  placeholder = "Select options...",
  containerClassName,
  onAddOption,
}: MultiSelectProps) {
  const [addedOptions, setAddedOptions] = React.useState<MultiSelectOption[]>(
    []
  );
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (option: string) => {
    onChange(value.filter((s) => s !== option));
  };

  const handleSelect = (option: MultiSelectOption) => {
    onChange([...value, option.value]);
  };
  const handleAddOption = () => {
    if (inputValue.trim() === "") return;
    const newOption = {
      label: inputValue,
      value: inputValue,
    };
    console.log(newOption);
    setAddedOptions((c) => [...c, newOption]);
    onChange([...value, newOption.value]);
    onAddOption?.(inputValue);
    setInputValue("");
  };
  const options = [...addedOptions, ...optionsProp];

  const selectables = options.filter((option) => !value.includes(option.value));
  useOutsideClick("[data-menu-container='true']", () => setOpen(false));
  return (
    <Command className="overflow-visible bg-transparent">
      <div
        tabIndex={-1}
        className={cn(
          "flex w-full h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          value.length > 0 && "h-auto",
          containerClassName
        )}
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
      >
        <div className="flex gap-1 flex-wrap flex-1">
          {value.map((option) => {
            return (
              <Badge key={option} variant="secondary" className=" h-6 py-0">
                {options.find((o) => o.value === option)?.label}
                <button
                  className="ml-1 mr-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnselect(option);
                  }}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandInput
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            placeholder={placeholder}
            showSearchIcon={false}
            className="bg-transparent outline-none placeholder:text-muted-foreground py-0 h-6"
            containerClassName="border-b-0 px-0 flex-1"
          />
        </div>
        <div className="flex items-center gap-1">
          <X
            className="h-4 w-4 opacity-50 cursor-pointer disabled:cursor-not-allowed"
            onClick={() => {
              setInputValue("");
              onChange([]);
            }}
          />
          <ChevronDown className="h-4 w-4 opacity-50 cursor-pointer disabled:cursor-not-allowed" />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div
            data-menu-container
            className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in"
            onBlur={() => setOpen(false)}
          >
            <CommandList>
              <CommandEmpty className="p-2">
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddOption();
                  }}
                >
                  Add {inputValue} to the list
                </div>
              </CommandEmpty>
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        handleSelect(option);
                      }}
                      className={"cursor-pointer"}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSelect(option);
                          setInputValue("");
                        }
                      }}
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </div>
        ) : null}
      </div>
    </Command>
  );
}

MultiSelect.displayName = "MultiSelect";

const useOutsideClick = (selector: string, callback: () => void) => {
  React.useEffect(() => {
    const handler = (event: MouseEvent) => {
      const ref = document.querySelector(selector);
      if (ref && !ref.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [callback, selector]);
};
