# How to contribute

We love sharing and collaborating, and looking forward to your commits!

Here are some important resources:

  * [About](https://www.weavy.com) - learn about us,
  * [Docs](https://www.weavy.com/docs) - documentation how to build in-app communication and collaboration with our SDK & API,
  * [Community](https://community.weavy.com/) - get in touch with our technical team and peers by joining our developer community, and
  * [Knowledge Base](https://www.weavy.com/kb) - find your answers in here.

## Submitting changes

Please send a [GitHub Pull Request](https://github.com/weavy/weavy-kendoreact-messenger/pull/new/master) with a clear list of what you've done (read more about [pull requests](http://help.github.com/pull-requests/)). When you send a pull request. Please follow our coding conventions (below) and make sure all of your commits are atomic (one feature per commit).

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "A brief summary of the commit
    > 
    > A paragraph describing what changed and its impact."

## Coding conventions

The general rule we follow is "use Visual Studio defaults" with one major exception in that we use [K&R style](https://en.wikipedia.org/wiki/Indentation_style#K&R_style) braces.

1. We use [K&R style](https://en.wikipedia.org/wiki/Indentation_style#K&R_style) braces, where each opening brace is in the same indentation level as its header.
2. We use four spaces of indentation (no tabs).
3. We use \_camelCase for internal and private fields and use readonly where possible. Prefix internal and private instance fields with \_, static fields with s_ and thread static fields with t_. When used on static fields, readonly should come after static (e.g. static readonly not readonly static). Public fields should be used sparingly and should use PascalCasing with no prefix when used.
4. We avoid this. unless absolutely necessary.
5. We always specify the visibility, even if it's the default (e.g. private string _foo not string _foo). Visibility should be the first modifier (e.g. public abstract not abstract public).
6. Namespace imports should be specified at the top of the file, outside of namespace declarations, and should be sorted alphabetically, with the exception of System.* namespaces, which are to be placed on top of all others.
7. Avoid more than one empty line at any time. For example, do not have two blank lines between members of a type.
8. Avoid spurious free spaces. For example avoid if (someVar == 0)..., where the dots mark the spurious free spaces. Consider enabling "View White Space (Ctrl+R, Ctrl+W)" or "Edit -> Advanced -> View White Space" if using Visual Studio to aid detection.
9. If a file happens to differ in style from these guidelines (e.g. private members are named m_member rather than _member), the existing style in that file takes precedence.
10. We only use var when the type is explicitly named on the right-hand side, typically due to either new or an explicit cast, e.g. var stream = new FileStream(...) not var stream = OpenStandardInput().
11. We use language keywords instead of BCL types (e.g. int, string, float instead of Int32, String, Single, etc) for both type references as well as method calls (e.g. int.Parse instead of Int32.Parse). See issue #13976 for examples.
12. We use PascalCasing to name all our constant local variables and fields. The only exception is for interop code where the constant value should exactly match the name and value of the code you are calling via interop.
13. We use PascalCasing for all method names, including local functions.
14. We use nameof(...) instead of "..." whenever possible and relevant.
15. Fields should be specified at the top within type declarations.
16. When including non-ASCII characters in the source code use Unicode escape sequences (\uXXXX) instead of literal characters. Literal non-ASCII characters occasionally get garbled by a tool or editor.
17. When using labels (for goto), indent the label one less than the current indentation.
18. When using a single-statement if, we follow these conventions:
    * Never use single-line form (for example: if (source == null) throw new ArgumentNullException("source");)
    * Using braces is always accepted, and required if any block of an if/else if/.../else compound statement uses braces or if a single statement body spans multiple lines.
    * Braces may be omitted only if the body of every block associated with an if/else if/.../else compound statement is placed on a single line.
19. Make all internal and private types static or sealed unless derivation from them is required. As with any implementation detail, they can be changed if/when derivation is required in the future.


Thanks,

The Weavy Team
